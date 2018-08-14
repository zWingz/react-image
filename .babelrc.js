console.log('babelrc-js');
module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        modules: false
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [['@babel/proposal-class-properties', { loose: true }]],
  "env": {
    "development": {
      "plugins": [
        "react-hot-loader/babel"
      ]
    }
  }
}
