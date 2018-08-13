var path = require('path')
module.exports = {
  // require 解析
  resolve: {
    extensions: ['.js', '.jsx', '.scss'], // 当require找不到模块添加后缀
    modules: [path.join(__dirname, '../src'), 'node_modules'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      assets: '@/assets'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}
