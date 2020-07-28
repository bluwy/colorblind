import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
import tsconfig from './tsconfig.json'

const {
  declaration,
  declarationDir,
  ...compilerOptions
} = tsconfig.compilerOptions

export default [
  {
    input: 'src/index.ts',
    output: [
      { format: 'cjs', file: pkg.main },
      { format: 'es', file: pkg.module },
      { format: 'umd', file: pkg.browser, name: 'colorblind' },
    ],
    plugins: [
      typescript({
        tsconfig: false,
        ...compilerOptions,
      }),
      terser(),
    ],
  },
]
