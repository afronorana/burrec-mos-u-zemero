// Shared harness for the e2e scripts (docker Nakama on 127.0.0.1:7350 with
// the dev key — see CLAUDE.md for how to run them). The turn and seat flow
// itself is unit-tested in node (match_reducer.test.ts); these cover what
// only a real server shows: storage, RPCs, sockets, hooks.
import { Client } from '@heroiclabs/nakama-js';

export const client = new Client('burrec-dev-key', '127.0.0.1', '7350', false);
export const failures = [];
// Unique-per-run suffix for device ids, emails and names.
export const stamp = Date.now();
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function assert(condition, label) {
  console.log(`${condition ? 'ok  ' : 'FAIL'} ${label}`);
  if (!condition) failures.push(label);
}

// An RPC's decoded JSON answer.
export async function rpc(session, id, input) {
  const response = await client.rpc(session, id, input || {});
  return typeof response.payload === 'string' ? JSON.parse(response.payload) : (response.payload || {});
}

// The error message an RPC fails with (null when it succeeds).
export async function rpcError(session, id, input) {
  try {
    await rpc(session, id, input);
    return null;
  } catch (error) {
    const body = error && typeof error.json === 'function' ? await error.json().catch(() => ({})) : {};
    return body.message || String(error);
  }
}

// Resolves once `check()` is truthy, or after `ms` (returns the last value).
export async function until(check, ms = 5000) {
  const deadline = Date.now() + ms;
  let value = check();
  while (!value && Date.now() < deadline) {
    await delay(100);
    value = check();
  }
  return value;
}

// Runs a script's main(): a crash counts as a failure; exit code 1 on any.
export function run(main, summary = () => 'all passed') {
  main()
    .catch((error) => {
      failures.push(String((error && error.stack) || error));
      console.error(error);
    })
    .finally(() => {
      console.log(failures.length ? `\n${failures.length} failure(s):\n- ${failures.join('\n- ')}` : `\n${summary()}`);
      process.exit(failures.length ? 1 : 0);
    });
}
