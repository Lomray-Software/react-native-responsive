import typescript from 'rollup-plugin-ts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';

export default {
  input: [
    'src/index.ts',
  ],
  output: {
    dir: 'lib',
    format: 'es',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
    exports: 'auto',
  },
  external: ['react', 'react-native'],
  plugins: [
    peerDepsExternal({
      includeDependencies: true,
    }),
    typescript({
      tsconfig: resolvedConfig => ({
        ...resolvedConfig,
        declaration: true,
        importHelpers: true,
        plugins: [
          {
            "transform": "@zerollup/ts-transform-paths",
            "exclude": ["*"]
          }
        ]
      }),
    }),
    copy({
      targets: [
        { src: 'package.json', dest: 'lib' },
        { src: 'README.md', dest: 'lib' },
      ]
    })
  ],
};
