// console.log('babelrc-js');
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
  "plugins": [
    ['@babel/proposal-class-properties', { loose: true }]
    // "external-helpers"
  ],
  "env": {
    "development": {
      "plugins": [
        "react-hot-loader/babel"
      ]
    },
    "production": {
      "plugins": [
        '@babel/plugin-external-helpers',
      ],
    }
  }
}
