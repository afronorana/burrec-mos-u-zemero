import { MATCH_MODULE } from '../../shared/protocol.js';
import { ludoMatchHandler } from './match_handler';
import { rpcCreatePrivateMatch, rpcHealthcheck, rpcJoinByCode } from './rpc';

const matchmakerMatched: nkruntime.MatchmakerMatchedFunction = function (ctx, logger, nk, matches) {
  return nk.matchCreate(MATCH_MODULE, { mode: 'quick' });
};

function InitModule(
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  initializer: nkruntime.Initializer,
) {
  initializer.registerRpc('healthcheck', rpcHealthcheck);
  initializer.registerRpc('create_private_match', rpcCreatePrivateMatch);
  initializer.registerRpc('join_by_code', rpcJoinByCode);
  initializer.registerMatch(MATCH_MODULE, ludoMatchHandler);
  initializer.registerMatchmakerMatched(matchmakerMatched);
  logger.info('burrec ludo module loaded');
}

// Reference InitModule so rollup does not tree-shake it out of the bundle.
!InitModule && InitModule.bind(null);
