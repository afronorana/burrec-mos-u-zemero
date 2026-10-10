import ApplicationStore from './ApplicationStore';
import { t } from './i18n';

// CONTEXT.md: Title — the name shown under a seat's player, in the viewer's
// own language. Bots and Shared-table companions never show one.
export function seatTitleName(seat) {
  if (!seat || seat.bot || seat.companion || !seat.userId) {
    return '';
  }
  const id = ApplicationStore.online.titles[seat.userId];
  return id ? t(`titles.${id}`) : '';
}
