// node --import hook for the unit tests: src/*.ts import each other without
// an extension (rollup resolves them for the server bundle); resolve those
// bare relative specifiers to the .ts file when node can't find them.
import { register } from 'node:module';

register('data:text/javascript,' + encodeURIComponent(`
export async function resolve(specifier, context, next) {
  try {
    return await next(specifier, context);
  } catch (error) {
    if (specifier.startsWith('.') && !/\\.[cm]?[jt]s$/.test(specifier)) {
      return next(specifier + '.ts', context);
    }
    throw error;
  }
}
`));
