// The presentation lock: MatchController's replay queue waits while any
// animation holds it. Each animation acquires a hold for its kind ('dice',
// 'move', 'finisher') and gets back its release function; one watchdog
// covers every hold, so a dice settle, a move or a Finisher that never
// completes (a hidden tab stops rAF, a lost timer) can't freeze the game.
//
// A stalled hold is dropped and its `onStall` runs (else the lock's default
// stall handler — MatchController's resync). Releases are idempotent and
// tied to their own hold, so a late release after reset() is a no-op.
// No imports: node-testable with fake timers (tests/presentation_lock.test.mjs).

export function createPresentationLock(timers = globalThis) {
  const holds = new Set();
  const listeners = new Set();
  let defaultStall = null;
  let watchdog = null;

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function schedule() {
    if (watchdog !== null) {
      timers.clearTimeout(watchdog);
      watchdog = null;
    }
    let earliest = Infinity;
    holds.forEach((hold) => {
      earliest = Math.min(earliest, hold.deadline);
    });
    if (earliest !== Infinity) {
      watchdog = timers.setTimeout(expire, Math.max(0, earliest - Date.now()));
    }
  }

  function expire() {
    watchdog = null;
    const now = Date.now();
    const stalled = [];
    holds.forEach((hold) => {
      if (hold.deadline <= now) {
        stalled.push(hold);
      }
    });
    stalled.forEach((hold) => holds.delete(hold));
    stalled.forEach((hold) => {
      const handler = hold.onStall || defaultStall;
      if (handler) {
        handler(hold.kind);
      }
    });
    schedule();
    if (stalled.length) {
      notify();
    }
  }

  return {
    // Holds the queue until the returned release() is called, or until
    // `timeoutMs` passes (then onStall).
    acquire(kind, { timeoutMs = 10000, onStall = null } = {}) {
      const hold = { kind, deadline: Date.now() + timeoutMs, onStall };
      holds.add(hold);
      schedule();
      return function release() {
        if (holds.delete(hold)) {
          schedule();
          notify();
        }
      };
    },

    held(kind) {
      if (!kind) {
        return holds.size > 0;
      }
      for (const hold of holds) {
        if (hold.kind === kind) {
          return true;
        }
      }
      return false;
    },

    // Called after any hold ends (released or stalled).
    onRelease(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    setDefaultStall(handler) {
      defaultStall = handler;
    },

    // Drops every hold without stalling (a snapshot replaced the board).
    reset() {
      holds.clear();
      schedule();
    },
  };
}

export default createPresentationLock();
