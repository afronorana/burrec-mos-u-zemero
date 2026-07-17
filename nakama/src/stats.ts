// Aggregate game stats kept in one system-owned storage object, surfaced by
// the admin_stats RPC (gated by the ADMIN_KEY runtime env var). Everything
// here is best-effort: a storage hiccup must never break a running match, so
// the record* helpers swallow their own errors.

const STATS_COLLECTION = 'admin_stats';
const STATS_KEY = 'summary';
const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000';
const MAX_RECENT_GAMES = 50;
const MAX_TRACKED_PLAYERS = 500;

export interface GameRecord {
  at: number;
  mode: string;
  players: string[];
  winner: string;
}

export interface AdminStats {
  totalStarted: number;
  totalFinished: number;
  players: { [name: string]: { games: number; lastAt: number } };
  recentGames: GameRecord[];
}

export function readStats(nk: nkruntime.Nakama): AdminStats {
  try {
    const objects = nk.storageRead([
      { collection: STATS_COLLECTION, key: STATS_KEY, userId: SYSTEM_USER_ID },
    ]);
    if (objects && objects.length > 0 && objects[0].value) {
      const value = objects[0].value as AdminStats;
      return {
        totalStarted: value.totalStarted || 0,
        totalFinished: value.totalFinished || 0,
        players: value.players || {},
        recentGames: value.recentGames || [],
      };
    }
  } catch (error) {
    // Fall through to a fresh object.
  }
  return { totalStarted: 0, totalFinished: 0, players: {}, recentGames: [] };
}

function writeStats(nk: nkruntime.Nakama, stats: AdminStats) {
  nk.storageWrite([
    { collection: STATS_COLLECTION, key: STATS_KEY, userId: undefined, value: stats as any },
  ]);
}

export function recordGameStarted(nk: nkruntime.Nakama) {
  try {
    const stats = readStats(nk);
    stats.totalStarted += 1;
    writeStats(nk, stats);
  } catch (error) {
    // Best-effort only.
  }
}

// Called once per finished game with the names of everyone seated at the end
// (covers drop-in joiners too) and the winner's name.
export function recordGameFinished(nk: nkruntime.Nakama, mode: string, playerNames: string[], winnerName: string) {
  try {
    const stats = readStats(nk);
    const now = Date.now();
    stats.totalFinished += 1;

    stats.recentGames.unshift({ at: now, mode: mode, players: playerNames, winner: winnerName });
    if (stats.recentGames.length > MAX_RECENT_GAMES) {
      stats.recentGames.length = MAX_RECENT_GAMES;
    }

    for (let i = 0; i < playerNames.length; i += 1) {
      const name = playerNames[i];
      const entry = stats.players[name] || { games: 0, lastAt: 0 };
      entry.games += 1;
      entry.lastAt = now;
      stats.players[name] = entry;
    }

    // Cap the name map so it cannot grow without bound: drop the names not
    // seen for the longest time.
    const names = Object.keys(stats.players);
    if (names.length > MAX_TRACKED_PLAYERS) {
      names.sort(function (a, b) {
        return (stats.players[a].lastAt || 0) - (stats.players[b].lastAt || 0);
      });
      for (let i = 0; i < names.length - MAX_TRACKED_PLAYERS; i += 1) {
        delete stats.players[names[i]];
      }
    }

    writeStats(nk, stats);
  } catch (error) {
    // Best-effort only.
  }
}
