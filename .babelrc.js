// console.log('babelrc-js');
module.exports = {
  "presets": [
    "@babel/preset-react"
  ],
  "plugins": [
    ['@babel/proposal-class-properties', { loose: true }],
    "react-hot-loader/babel"
  ],
}
