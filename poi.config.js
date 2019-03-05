module.exports = {
  entry: './develop/index',
  plugins: [
    {
      resolve: '@poi/plugin-typescript',
      options: {}
    }
  ],
  configureWebpack: {
    resolve: {
      extensions: ['.scss']
    }
  }
}
