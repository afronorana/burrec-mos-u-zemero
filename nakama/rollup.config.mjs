import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/main.ts',
  external: ['nakama-runtime'],
  plugins: [
    resolve({ extensions: ['.mjs', '.js', '.ts', '.json'] }),
    commonjs(),
    typescript({ noEmit: false, outDir: 'build', filterRoot: false }),
  ],
  output: {
    // cjs with no exports produces a flat script: goja evaluates it at global
    // scope, which is how Nakama finds InitModule.
    format: 'cjs',
    file: 'build/index.js',
    sourcemap: false,
  },
};
