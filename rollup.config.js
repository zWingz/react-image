import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import sass from 'node-sass'
import autoprefixer from 'autoprefixer'
import postcssurl from 'postcss-url'
import pkg from './package.json'
export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [
    external(),
    postcss({
      preprocessor: (content, id) => new Promise(res => {
        const result = sass.renderSync({ file: id })
        res({ code: result.css.toString() })
      }),
      plugins: [autoprefixer, postcssurl({ url: 'inline' })],
      minimize: true,
      // extract: true,
      extensions: ['.sass', '.css']
    }),
    url({
      limit: 10 * 1024, // inline files < 10k, copy files > 10k
      publicPath: '/',
      emitFiles: true // defaults to true
    }),
    babel({
      exclude: 'node_modules/**'
      // externalHelpers: true
    }),
    resolve({
      extensions: ['.js', '.jsx', '.json']
    }),
    commonjs()
  ]
}
