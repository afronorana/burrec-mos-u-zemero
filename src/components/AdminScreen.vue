<template>
  <div class="menu-center">
    <app-panel class="menu-card admin-card">
      <h2 class="panel-title">Admin</h2>

      <!-- Not (yet) an Admin: sign in, or copy your id into ADMIN_USER_IDS -->
      <template v-if="!overview">
        <app-spinner v-if="busy" />
        <template v-else>
          <p class="admin-note">
            Admins are Members whose user id is listed in the server's <code>ADMIN_USER_IDS</code>.
          </p>
          <p v-if="refusedId" class="admin-note">
            Signed in as <strong>{{ accountLabel }}</strong> — your user id:<br>
            <code class="admin-id">{{ refusedId }}</code>
          </p>
          <div class="menu-row">
            <app-button @click="signIn">Sign in</app-button>
            <app-button slate-blue @click="load">Retry</app-button>
          </div>
        </template>
        <p v-if="error" class="online-error">{{ error }}</p>
      </template>

      <!-- One user's detail -->
      <template v-else-if="user">
        <div class="admin-user-head">
          <div>
            <strong class="admin-user-name">{{ user.name }}</strong>
            <span class="admin-badge" :class="user.member ? 'admin-badge--member' : ''">{{ user.member ? 'Member' : 'Guest' }}</span>
            <span v-if="user.shadowbanned" class="admin-badge admin-badge--warn">Shadowbanned</span>
            <span v-if="user.banned" class="admin-badge admin-badge--bad">Banned</span>
          </div>
          <div class="admin-muted">{{ user.email || 'no email' }} · {{ user.id }}</div>
          <div class="admin-muted">Last seen {{ formatDate(user.lastSeenAt) }} · {{ user.gamesPlayed }} games</div>
        </div>

        <div class="form-row">
          <app-input v-model="actionNote" label="Note (saved in history)" :required="false" />
        </div>
        <div class="menu-row admin-actions">
          <app-button small :red="!user.shadowbanned" :disabled="busy" @click="setShadowban(!user.shadowbanned)">
            {{ user.shadowbanned ? 'Lift shadowban' : 'Shadowban' }}
          </app-button>
          <app-button small :red="!user.banned" :disabled="busy" @click="setBan(!user.banned)">
            {{ user.banned ? 'Unban' : 'Ban' }}
          </app-button>
        </div>

        <h3 class="admin-section-title">Reports against them ({{ user.reports.length }})</h3>
        <app-scrollable max-height="200px" class="admin-list">
          <p v-if="!user.reports.length" class="admin-empty">None.</p>
          <div v-for="report in user.reports" :key="report.id" class="admin-report">
            <div class="admin-report-line">
              <span class="admin-badge">{{ report.reason }}</span>
              <span class="admin-badge" :class="statusClass(report.status)">{{ report.status }}</span>
              <span class="admin-muted">{{ formatDate(report.createdAt) }} · by {{ report.reporterName }}</span>
            </div>
            <div class="admin-evidence">“{{ report.evidence }}”<span v-if="!report.verified" class="admin-unverified"> (unverified)</span></div>
          </div>
        </app-scrollable>

        <h3 class="admin-section-title">History</h3>
        <app-scrollable max-height="160px" class="admin-list">
          <p v-if="!user.history.length" class="admin-empty">No admin actions yet.</p>
          <div v-for="(entry, idx) in user.history" :key="idx" class="admin-row">
            <span class="admin-row-main"><strong>{{ entry.action }}</strong> by {{ entry.adminName }}<span v-if="entry.note"> — {{ entry.note }}</span></span>
            <span class="admin-muted">{{ formatDate(entry.at) }}</span>
          </div>
        </app-scrollable>

        <p v-if="error" class="online-error">{{ error }}</p>
        <div class="menu-row" style="margin-top: 12px;">
          <app-button slate-blue @click="closeUser">Back</app-button>
        </div>
      </template>

      <template v-else>
        <app-tabs v-model="tab" :options="tabOptions" class="admin-tabs" />

        <!-- Reports queue -->
        <template v-if="tab === 'reports'">
          <label class="admin-check">
            <input v-model="showAllReports" type="checkbox" @change="loadReports" /> Show resolved and dismissed
          </label>
          <app-scrollable max-height="52vh" class="admin-list">
            <p v-if="!reports.length" class="admin-empty">{{ showAllReports ? 'No reports yet.' : 'No open reports.' }}</p>
            <div v-for="report in reports" :key="report.id" class="admin-report">
              <div class="admin-report-line">
                <button type="button" class="admin-link" @click="openUser(report.targetId)">{{ report.targetName }}</button>
                <span class="admin-badge">{{ report.reason }}</span>
                <span class="admin-badge">{{ report.kind }}</span>
                <span v-if="report.status !== 'open'" class="admin-badge" :class="statusClass(report.status)">{{ report.status }}</span>
              </div>
              <div class="admin-evidence">“{{ report.evidence }}”<span v-if="!report.verified" class="admin-unverified"> (unverified)</span></div>
              <div v-if="report.note" class="admin-muted">Reporter's note: {{ report.note }}</div>
              <div class="admin-muted">{{ formatDate(report.createdAt) }} · by {{ report.reporterName }}</div>
              <div v-if="report.status !== 'open'" class="admin-muted">
                {{ report.status }} by {{ report.resolvedByName }} {{ formatDate(report.resolvedAt) }}<span v-if="report.resolutionNote"> — {{ report.resolutionNote }}</span>
              </div>
              <div v-else class="menu-row admin-report-actions">
                <app-button small :disabled="busy" @click="resolve(report, 'resolved')">Resolve</app-button>
                <app-button small slate-blue :disabled="busy" @click="resolve(report, 'dismissed')">Dismiss</app-button>
              </div>
            </div>
          </app-scrollable>
        </template>

        <!-- Users -->
        <template v-else-if="tab === 'users'">
          <div class="form-row">
            <app-input v-model="userQuery" label="Search name, email or id" :required="false" @keyup.enter="loadUsers(0)" />
          </div>
          <label class="admin-check">
            <input v-model="includeGuests" type="checkbox" @change="loadUsers(0)" /> Include all Guests
          </label>
          <app-scrollable max-height="46vh" class="admin-list">
            <p v-if="!users.length" class="admin-empty">No users match.</p>
            <button v-for="row in users" :key="row.id" type="button" class="admin-user-row" @click="openUser(row.id)">
              <span class="admin-row-main">
                <strong>{{ row.name }}</strong>
                <span class="admin-badge" :class="row.member ? 'admin-badge--member' : ''">{{ row.member ? row.method : 'guest' }}</span>
                <span v-if="row.openReports" class="admin-badge admin-badge--bad">{{ row.openReports }} open</span>
                <span v-if="row.shadowbanned" class="admin-badge admin-badge--warn">shadowbanned</span>
                <span v-if="row.banned" class="admin-badge admin-badge--bad">banned</span>
                <br><span class="admin-muted">{{ row.email || '—' }} · joined {{ formatDate(row.createdAt) }} · seen {{ formatDate(row.lastSeenAt) }} · {{ row.gamesPlayed }} games</span>
              </span>
            </button>
          </app-scrollable>
          <div class="menu-row admin-pager">
            <app-button small slate-blue :disabled="busy || usersOffset === 0" @click="loadUsers(usersOffset - 50)">Prev</app-button>
            <app-button small slate-blue :disabled="busy || !usersHasMore" @click="loadUsers(usersOffset + 50)">Next</app-button>
          </div>
        </template>

        <!-- Stats -->
        <template v-else>
          <div class="admin-summary">
            <div class="admin-stat">
              <span class="admin-stat-value">{{ overview.totalStarted }}</span>
              <span class="admin-stat-label">Games started</span>
            </div>
            <div class="admin-stat">
              <span class="admin-stat-value">{{ overview.totalFinished }}</span>
              <span class="admin-stat-label">Games finished</span>
            </div>
            <div class="admin-stat">
              <span class="admin-stat-value">{{ overview.uniquePlayers }}</span>
              <span class="admin-stat-label">Players</span>
            </div>
          </div>
          <h3 class="admin-section-title">Recent games</h3>
          <app-scrollable max-height="40vh" class="admin-list">
            <p v-if="!overview.recentGames.length" class="admin-empty">No games recorded yet.</p>
            <div v-for="(game, idx) in overview.recentGames" :key="idx" class="admin-row">
              <span class="admin-muted">{{ formatDate(game.at) }}</span>
              <span class="admin-row-main">{{ game.players.join(', ') }}</span>
              <strong>🏆 {{ game.winner }}</strong>
            </div>
          </app-scrollable>
        </template>

        <p v-if="error" class="online-error">{{ error }}</p>
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

// #admin: Reports queue, user list + detail (Shadowban / Ban, history), and
// game stats. Every RPC re-checks that the caller is an Admin (moderation.ts).
export default {
  data() {
    return {
      store: ApplicationStore,
      overview: null,
      refusedId: null,
      tab: 'reports',
      reports: [],
      showAllReports: false,
      users: [],
      userQuery: '',
      includeGuests: false,
      usersOffset: 0,
      usersHasMore: false,
      user: null,
      actionNote: '',
      busy: false,
      error: '',
    };
  },
  computed: {
    tabOptions() {
      const open = this.overview ? this.overview.openReports : 0;
      return [
        { value: 'reports', label: open ? `Reports (${open})` : 'Reports' },
        { value: 'users', label: 'Users' },
        { value: 'stats', label: 'Stats' },
      ];
    },
    accountLabel() {
      const account = this.store.online.account;
      return account.email || account.method;
    },
  },
  watch: {
    tab(tab) {
      if (tab === 'users' && !this.users.length) this.loadUsers(0);
    },
    // Signing in through the auth modal changes identity: try again.
    'store.online.selfUserId'() {
      this.load();
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    formatDate(timestamp) {
      return timestamp ? new Date(timestamp).toLocaleString() : '—';
    },
    statusClass(status) {
      return status === 'open' ? 'admin-badge--bad' : status === 'resolved' ? 'admin-badge--member' : '';
    },
    async call(id, input) {
      const result = await NakamaClient.rpc(id, input);
      if (result.error === 'forbidden') {
        this.overview = null;
        this.refusedId = result.userId;
        throw new Error('Not an admin.');
      }
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    async run(action) {
      this.busy = true;
      this.error = '';
      try {
        await action();
      } catch (error) {
        this.error = error && error.message ? error.message : 'Could not reach the game server.';
      } finally {
        this.busy = false;
      }
    },
    load() {
      return this.run(async () => {
        await NakamaClient.ensureAnySession();
        this.overview = await this.call('admin_overview');
        this.refusedId = null;
        await this.loadReportsNow();
      });
    },
    async loadReportsNow() {
      const result = await this.call('admin_reports', { status: this.showAllReports ? 'all' : 'open' });
      this.reports = result.reports || [];
    },
    loadReports() {
      return this.run(() => this.loadReportsNow());
    },
    loadUsers(offset) {
      return this.run(async () => {
        const result = await this.call('admin_users', {
          query: this.userQuery.trim(),
          includeGuests: this.includeGuests,
          offset: Math.max(0, offset),
        });
        this.users = result.users || [];
        this.usersHasMore = !!result.hasMore;
        this.usersOffset = Math.max(0, offset);
      });
    },
    openUser(userId) {
      return this.run(async () => {
        this.user = await this.call('admin_user', { userId });
        this.actionNote = '';
      });
    },
    closeUser() {
      this.user = null;
      this.error = '';
    },
    resolve(report, status) {
      return this.run(async () => {
        await this.call('admin_resolve_report', { reportId: report.id, status });
        this.overview = await this.call('admin_overview');
        await this.loadReportsNow();
      });
    },
    async refreshUser() {
      this.user = await this.call('admin_user', { userId: this.user.id });
      this.actionNote = '';
    },
    setShadowban(on) {
      return this.run(async () => {
        await this.call('admin_set_shadowban', { userId: this.user.id, on, note: this.actionNote });
        await this.refreshUser();
      });
    },
    setBan(on) {
      if (on && !window.confirm(`Ban ${this.user.name}? They are signed out and cannot play until unbanned.`)) {
        return null;
      }
      return this.run(async () => {
        await this.call('admin_set_ban', { userId: this.user.id, on, note: this.actionNote });
        await this.refreshUser();
      });
    },
    signIn() {
      this.store.online.authView = this.store.online.account.method === 'guest' ? 'login' : 'account';
      this.store.online.authOpen = true;
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
  width: min(720px, 96vw);
  max-height: 94vh;
  overflow-y: auto;
}

.admin-tabs {
  margin-bottom: 12px;
}

.admin-note {
  font-size: 0.8rem;
  line-height: 1.5;
  margin: 0 0 12px;
}

.admin-id {
  display: inline-block;
  margin-top: 4px;
  padding: 4px 6px;
  background: #ffffff;
  border-radius: 4px;
  user-select: all;
  word-break: break-all;
}

.admin-check {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 8px;
  font-size: 0.75rem;
  cursor: pointer;
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

.admin-row,
.admin-user-row {
  display: flex;
  gap: 8px;
  align-items: baseline;
  width: 100%;
  padding: 5px 0;
  font: inherit;
  font-size: 12px;
  text-align: left;
  color: var(--agu-color-base, #263f2a);
  background: none;
  border: none;
  border-bottom: 1px dashed rgba(38, 63, 42, 0.12);
}

.admin-user-row {
  cursor: pointer;
}

.admin-user-row:hover {
  background: rgba(38, 63, 42, 0.05);
}

.admin-row-main {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.admin-report {
  padding: 8px 0;
  font-size: 12px;
  border-bottom: 1px dashed rgba(38, 63, 42, 0.12);
  color: var(--agu-color-base, #263f2a);
}

.admin-report-line {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.admin-evidence {
  margin: 4px 0;
  font-style: italic;
  overflow-wrap: anywhere;
}

.admin-unverified {
  font-style: normal;
  color: var(--agu-color-red, #e9576f);
}

.admin-report-actions {
  justify-content: flex-start;
  margin-top: 6px;
}

.admin-badge {
  display: inline-block;
  margin-left: 4px;
  padding: 1px 6px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 999px;
  background: rgba(38, 63, 42, 0.1);
}

.admin-badge--member {
  background: rgba(42, 157, 143, 0.2);
}

.admin-badge--warn {
  background: rgba(244, 162, 97, 0.35);
}

.admin-badge--bad {
  background: rgba(233, 87, 111, 0.25);
}

.admin-muted {
  font-size: 10px;
  opacity: 0.65;
}

.admin-link {
  padding: 0;
  font: inherit;
  font-weight: 700;
  color: inherit;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
}

.admin-user-head {
  margin-bottom: 12px;
  font-size: 12px;
  color: var(--agu-color-base, #263f2a);
}

.admin-user-name {
  font-size: 1rem;
}

.admin-actions,
.admin-pager {
  justify-content: flex-start;
  margin-top: 8px;
}

.online-error {
  margin-top: 14px;
  font-size: 12px;
  color: var(--agu-color-red, #e9576f);
}
</style>
