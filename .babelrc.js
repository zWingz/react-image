// console.log('babelrc-js');
module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        modules: false,
        "useBuiltIns": "entry",
        "targets": {
          "browsers": [
            "last 2 versions"
          ]
        },
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    ['@babel/proposal-class-properties', { loose: true }]
  ],
  "env": {
    "development": {
      "plugins": [
        "react-hot-loader/babel"
      ]
    }
  }
}
