import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import sass from 'node-sass'
import autoprefixer from 'autoprefixer'
import pkg from './package.json'
const babelrc = require('./.babelrc.js')
export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      preprocessor: (content, id) => new Promise((res) => {
        const result = sass.renderSync({ file: id })
        res({ code: result.css.toString() })
      }),
      plugins: [
        autoprefixer
      ],
      // extract: true,
      extensions: ['.sass', '.css']
    }),
    url({
      limit: 10 * 1024, // inline files < 10k, copy files > 10k
      publicPath: '/',
      emitFiles: true // defaults to true
    }),
    babel({
      exclude: 'node_modules/**',
      ...babelrc
    }),
    resolve(
      {
        extensions: ['.js', '.jsx', '.json']
      }
    ),
    commonjs()
  ]
}
