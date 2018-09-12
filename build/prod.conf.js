const merge = require('webpack-merge')
const base = require('./base.conf')

const config = merge(base, {
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
    // libraryTarget: 'commonjs2',
    filename: 'index.js',
    path: `${__dirname}/../dist`
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            minimizer: true
          }
        }, 'sass-loader']
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes'
  },
  optimization: {
    minimize: true
  }
})

module.exports = config
