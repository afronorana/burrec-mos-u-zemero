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
  rpcAuthStatus,
  rpcRequestPasswordReset,
  rpcResendVerification,
  rpcResetPassword,
  rpcVerifyEmail,
} from './auth';

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
  initializer.registerRpc('auth_status', rpcAuthStatus);
  initializer.registerRpc('request_password_reset', rpcRequestPasswordReset);
  initializer.registerRpc('reset_password', rpcResetPassword);
  initializer.registerRpc('verify_email', rpcVerifyEmail);
  initializer.registerRpc('resend_verification', rpcResendVerification);
  initializer.registerMatch(MATCH_MODULE, ludoMatchHandler);
  logger.info('burrec ludo module loaded');
}

// Reference InitModule so rollup does not tree-shake it out of the bundle.
!InitModule && InitModule.bind(null);
