const merge = require('webpack-merge')
const base = require('./base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = merge(base, {
  mode: 'development',
  entry: {
    index: './develop/index.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.md$/,
        use: ['babel-loader', '@mdx-js/loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './develop/index.html',
      filename: 'index.html',
      inject: true,
      chunks: ['index']
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
