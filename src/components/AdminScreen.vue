<template>
  <div class="menu-center">
    <app-panel class="menu-card admin-card">
      <h2 class="panel-title">Admin</h2>

      <template v-if="!stats">
        <div class="form-row">
          <app-input
            v-model="adminKey"
            label="Admin key"
            type="password"
            :required="false"
            @keyup.enter="load"
          />
        </div>
        <app-button class="menu-btn-full" :disabled="busy || !adminKey.trim()" @click="load">
          {{ busy ? 'Loading…' : 'Load stats' }}
        </app-button>
        <p v-if="error" class="online-error">{{ error }}</p>
      </template>

      <template v-else>
        <div class="admin-summary">
          <div class="admin-stat">
            <span class="admin-stat-value">{{ stats.totalStarted }}</span>
            <span class="admin-stat-label">Games started</span>
          </div>
          <div class="admin-stat">
            <span class="admin-stat-value">{{ stats.totalFinished }}</span>
            <span class="admin-stat-label">Games finished</span>
          </div>
          <div class="admin-stat">
            <span class="admin-stat-value">{{ stats.uniquePlayers }}</span>
            <span class="admin-stat-label">Players</span>
          </div>
        </div>

        <h3 class="admin-section-title">Recent games</h3>
        <app-scrollable max-height="220px" class="admin-list">
          <p v-if="!stats.recentGames.length" class="admin-empty">No games recorded yet.</p>
          <div v-for="(game, idx) in stats.recentGames" :key="idx" class="admin-game-row">
            <span class="admin-game-date">{{ formatDate(game.at) }}</span>
            <span class="admin-game-players">{{ game.players.join(', ') }}</span>
            <span class="admin-game-winner">🏆 {{ game.winner }}</span>
          </div>
        </app-scrollable>

        <h3 class="admin-section-title">Players</h3>
        <app-scrollable max-height="180px" class="admin-list">
          <div v-for="entry in sortedPlayers" :key="entry.name" class="admin-player-row">
            <span class="admin-player-name">{{ entry.name }}</span>
            <span class="admin-player-games">{{ entry.games }} game{{ entry.games === 1 ? '' : 's' }}</span>
            <span class="admin-player-last">{{ formatDate(entry.lastAt) }}</span>
          </div>
        </app-scrollable>

        <app-button small slate-blue class="admin-refresh" :disabled="busy" @click="load">
          {{ busy ? 'Loading…' : 'Refresh' }}
        </app-button>
      </template>

      <div class="menu-row" style="margin-top: 16px;">
        <app-button red @click="exit">Exit</app-button>
      </div>
    </app-panel>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import NakamaClient from '../network/NakamaClient';

const KEY_STORAGE = 'burrec.admin.key';

export default {
  data() {
    return {
      store: ApplicationStore,
      adminKey: window.localStorage.getItem(KEY_STORAGE) || '',
      stats: null,
      busy: false,
      error: '',
    };
  },
  computed: {
    sortedPlayers() {
      if (!this.stats) {
        return [];
      }
      return Object.keys(this.stats.players || {})
        .map((name) => ({ name, ...this.stats.players[name] }))
        .sort((a, b) => (b.lastAt || 0) - (a.lastAt || 0));
    },
  },
  mounted() {
    if (this.adminKey.trim()) {
      this.load();
    }
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) {
        return '—';
      }
      return new Date(timestamp).toLocaleString();
    },
    async load() {
      const key = this.adminKey.trim();
      if (!key || this.busy) {
        return;
      }
      this.busy = true;
      this.error = '';
      try {
        // Any session works — the RPC authorizes by key, not by account.
        await NakamaClient.ensureAnySession();
        const result = await NakamaClient.rpc('admin_stats', { key });
        if (result.error) {
          this.error = result.error === 'admin_disabled'
            ? 'Admin stats are disabled on this server (ADMIN_KEY not set).'
            : 'Wrong admin key.';
          this.stats = null;
          return;
        }
        this.stats = result;
        window.localStorage.setItem(KEY_STORAGE, key);
      } catch (error) {
        this.error = 'Could not reach the game server.';
        this.stats = null;
      } finally {
        this.busy = false;
      }
    },
    exit() {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      this.store.currentScreen = 'main-menu';
    },
  },
};
</script>

<style scoped>
.admin-card {
  width: min(420px, 94vw);
}

.admin-summary {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.admin-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 6px;
  background: rgba(38, 63, 42, 0.06);
  border: 1.5px solid rgba(38, 63, 42, 0.25);
  border-radius: 6px;
}

.admin-stat-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--agu-color-base, #263f2a);
}

.admin-stat-label {
  font-size: 0.65rem;
  opacity: 0.7;
  text-align: center;
}

.admin-section-title {
  margin: 12px 0 6px;
  font-size: 0.8rem;
  color: var(--agu-color-base, #263f2a);
}

.admin-list {
  background: #ffffff;
  border: 1.5px solid rgba(38, 63, 42, 0.25);
  border-radius: 4px;
  padding: 6px 8px;
}

.admin-empty {
  margin: 4px 0;
  font-size: 12px;
  opacity: 0.6;
}

.admin-game-row,
.admin-player-row {
  display: flex;
  gap: 8px;
  align-items: baseline;
  font-size: 12px;
  padding: 3px 0;
  border-bottom: 1px dashed rgba(38, 63, 42, 0.12);
  color: var(--agu-color-base, #263f2a);
}

.admin-game-row:last-child,
.admin-player-row:last-child {
  border-bottom: none;
}

.admin-game-date,
.admin-player-last {
  font-size: 10px;
  opacity: 0.6;
  white-space: nowrap;
}

.admin-game-players,
.admin-player-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-game-winner,
.admin-player-games {
  white-space: nowrap;
  font-weight: 700;
}

.admin-refresh {
  margin-top: 12px;
}

.online-error {
  margin-top: 14px;
  font-size: 12px;
  color: var(--agu-color-red, #e9576f);
}
</style>
