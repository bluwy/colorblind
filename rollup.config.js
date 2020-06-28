import path from 'path'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      { format: 'cjs', file: pkg.main },
      { format: 'es', file: pkg.module },
    ],
    plugins: [typescript(), terser()],
  },
  {
    input: 'src/index.ts',
    output: {
      name: pkg.name,
      format: 'umd',
      dir: './',
      entryFileNames: pkg.browser,
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: path.dirname(pkg.types),
      }),
      terser(),
    ],
  },
]
