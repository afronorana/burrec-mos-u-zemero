<template>
  <!-- CONTEXT.md: Streak — opened from the 🔥 button on Home. A day counts
       when the game opens (store_state); its Points wait here until
       collected. -->
  <div class="streak-backdrop" @click.self="close">
    <app-panel class="streak-card">
      <h3 class="panel-title">{{ t('streak.title') }}</h3>
      <p class="streak-count">🔥 {{ t('streak.days', { n: streak.count }) }}</p>
      <p class="streak-week">{{ t('streak.week', { n: streak.week }) }}</p>

      <ol class="streak-days">
        <li
          v-for="chip in chips"
          :key="chip.day"
          class="streak-day"
          :class="[`streak-day--${chip.state}`, { 'streak-day--bonus': chip.day === 7 }]"
        >
          <span class="streak-day-label">{{ t('streak.day', { n: chip.day }) }}</span>
          <span class="streak-day-reward">{{ chip.state === 'done' ? '✓' : `+${chip.reward}` }}</span>
        </li>
      </ol>

      <app-button v-if="streak.pending" class="streak-collect" :loading="collecting" :disabled="collecting" @click="collect">
        {{ t('streak.collect', { n: streak.pending }) }}
      </app-button>
      <p v-else-if="collected" class="streak-note streak-note--paid">{{ t('streak.collected', { n: collected }) }}</p>
      <p v-else class="streak-note">{{ t('streak.comeBack') }}</p>
      <p v-if="error" class="streak-error">{{ t('errors.generic') }}</p>

      <p class="streak-note">{{ streak.freeze ? `❄ ${t('streak.freezeHeld')}` : t('streak.freezeHow') }}</p>
      <p class="streak-note">{{ streak.longest === 1 ? t('streak.longestOne') : t('streak.longest', { n: streak.longest }) }}</p>
      <button v-if="!store.online.account.member" type="button" class="streak-register" @click="register">
        {{ t('win.pointsRegister') }}
      </button>

      <app-button red class="streak-close" @click="close">{{ t('close') }}</app-button>
    </app-panel>
  </div>
</template>

<script>
import ApplicationStore from '../utils/ApplicationStore';
import NakamaClient from '../network/NakamaClient';
import { STREAK_DAILY, STREAK_WEEKLY } from '../../shared/protocol';
import { t } from '../utils/i18n';
import { promptRegister } from '../utils/authPrompt';

export default {
  data() {
    return {
      store: ApplicationStore,
      collecting: false,
      collected: 0,
      error: false,
    };
  },
  computed: {
    streak() {
      return this.store.online.store.streak || { count: 0, day: 0, week: 1, freeze: 0, pending: 0, longest: 0 };
    },
    // This week's seven days: done, today (already counted) or still to come.
    chips() {
      const { day, week } = this.streak;
      const chips = [];
      for (let n = 1; n <= 7; n += 1) {
        const reward = n === 7 ? STREAK_WEEKLY[Math.min(week, STREAK_WEEKLY.length) - 1] : STREAK_DAILY[n - 1];
        chips.push({ day: n, reward, state: n < day ? 'done' : (n === day ? 'today' : 'next') });
      }
      return chips;
    },
  },
  methods: {
    t,
    async collect() {
      this.collecting = true;
      this.error = false;
      try {
        this.collected = await NakamaClient.collectStreak();
      } catch (error) {
        this.error = true;
      } finally {
        this.collecting = false;
      }
    },
    register() {
      this.close();
      promptRegister('points');
    },
    close() {
      this.store.online.streakOpen = false;
    },
  },
};
</script>

<style scoped>
.streak-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1002;
  padding: 16px;
  pointer-events: all;
}

.streak-card {
  width: 100%;
  max-width: 380px;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  text-align: center;
  color: var(--agu-color-base, #263f2a);
}

.streak-card .panel-title {
  margin-bottom: 6px;
}

.streak-count {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.streak-week {
  margin: 0 0 12px;
  font-size: 0.8rem;
  font-weight: 700;
  opacity: 0.75;
}

.streak-days {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  margin: 0 0 14px;
  padding: 0;
  list-style: none;
}

.streak-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 2px;
  background: #ffffff;
  border: 2px solid var(--agu-color-base, #263f2a);
  border-radius: 8px;
}

.streak-day--bonus {
  grid-column: span 2;
}

.streak-day--done {
  background: rgba(42, 157, 143, 0.25);
}

.streak-day--today {
  background: #fdc25b;
  box-shadow: 0 0 0 2px #ff7700 inset;
}

.streak-day--next {
  opacity: 0.7;
}

.streak-day-label {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
}

.streak-day-reward {
  font-size: 0.9rem;
  font-weight: 800;
}

.streak-day--bonus .streak-day-reward {
  font-size: 1.1rem;
}

.streak-collect,
.streak-close {
  width: 100%;
}

.streak-close {
  margin-top: 12px;
}

.streak-note {
  margin: 8px 0 0;
  font-size: 0.8rem;
  font-weight: 600;
}

.streak-note--paid {
  font-weight: 800;
}

.streak-error {
  margin: 6px 0 0;
  font-size: 0.75rem;
  color: var(--agu-color-red, #e9576f);
}

.streak-register {
  margin-top: 8px;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 800;
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
</style>
