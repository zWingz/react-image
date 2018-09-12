const merge = require('webpack-merge')
const base = require('./base.conf')

const config = merge(base, {
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: 'index.js',
    path: `${__dirname}/../dist`
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', {
          loader: 'css-loader'
        }, 'sass-loader']
      }
    ]
  },
  externals: {
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom',
    'prop-types': 'commonjs prop-types'
  }
})

module.exports = config
