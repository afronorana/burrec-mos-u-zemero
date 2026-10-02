import { MATCH_MODULE } from '../../shared/protocol.js';
import { ludoMatchHandler } from './match_handler';
import {
  rpcCreatePrivateMatch,
  rpcCreatePublicMatch,
  rpcHealthcheck,
  rpcJoinByCode,
  rpcQuickMatch,
} from './rpc';
import {
  afterAuthenticateEmail,
  afterLinkEmail,
  rpcAuthStatus,
  rpcDeleteAccount,
  rpcRequestPasswordReset,
  rpcResendVerification,
  rpcResetPassword,
  rpcVerifyEmail,
} from './auth';
import {
  DIGEST_CLOCK_ID,
  DIGEST_SCHEDULE,
  beforeChannelMessageSend,
  onDigestClock,
  rpcAdminOverview,
  rpcAdminReports,
  rpcAdminResolveReport,
  rpcAdminSendDigest,
  rpcAdminSetBan,
  rpcAdminSetShadowban,
  rpcAdminUser,
  rpcAdminUsers,
  rpcBlockList,
  rpcReportPlayer,
  rpcSetBlock,
} from './moderation';

function InitModule(
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  initializer: nkruntime.Initializer,
) {
  initializer.registerRpc('healthcheck', rpcHealthcheck);
  initializer.registerRpc('create_private_match', rpcCreatePrivateMatch);
  initializer.registerRpc('create_public_match', rpcCreatePublicMatch);
  initializer.registerRpc('quick_match', rpcQuickMatch);
  initializer.registerRpc('join_by_code', rpcJoinByCode);
  initializer.registerAfterAuthenticateEmail(afterAuthenticateEmail);
  initializer.registerAfterLinkEmail(afterLinkEmail);
  initializer.registerRtBefore('ChannelMessageSend', beforeChannelMessageSend);
  initializer.registerRpc('auth_status', rpcAuthStatus);
  initializer.registerRpc('request_password_reset', rpcRequestPasswordReset);
  initializer.registerRpc('reset_password', rpcResetPassword);
  initializer.registerRpc('verify_email', rpcVerifyEmail);
  initializer.registerRpc('resend_verification', rpcResendVerification);
  initializer.registerRpc('delete_account', rpcDeleteAccount);
  initializer.registerRpc('block_list', rpcBlockList);
  initializer.registerRpc('set_block', rpcSetBlock);
  initializer.registerRpc('report_player', rpcReportPlayer);
  initializer.registerRpc('admin_overview', rpcAdminOverview);
  initializer.registerRpc('admin_reports', rpcAdminReports);
  initializer.registerRpc('admin_resolve_report', rpcAdminResolveReport);
  initializer.registerRpc('admin_users', rpcAdminUsers);
  initializer.registerRpc('admin_user', rpcAdminUser);
  initializer.registerRpc('admin_set_shadowban', rpcAdminSetShadowban);
  initializer.registerRpc('admin_set_ban', rpcAdminSetBan);
  initializer.registerRpc('admin_send_digest', rpcAdminSendDigest);
  // goja has no timers: a never-written leaderboard's daily reset is the
  // clock for the Report digest (moderation.ts).
  nk.leaderboardCreate(DIGEST_CLOCK_ID, true, nkruntime.SortOrder.DESCENDING, nkruntime.Operator.BEST, DIGEST_SCHEDULE, null, false);
  initializer.registerLeaderboardReset(onDigestClock);
  initializer.registerMatch(MATCH_MODULE, ludoMatchHandler);
  logger.info('burrec ludo module loaded');
}

// Reference InitModule so rollup does not tree-shake it out of the bundle.
!InitModule && InitModule.bind(null);
