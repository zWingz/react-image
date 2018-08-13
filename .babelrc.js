module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            "last 2 versions",
          ]
        },
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
