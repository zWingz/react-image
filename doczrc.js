import { css } from 'docz-plugin-css'
export default {
  base: '/react-image/',
  title: 'Image Component',
  description: 'A React Component',
  dest: 'website',
  // src: './doc',
  protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
  themeConfig: {
    mode: 'light'
  },
  hashRouter: true,
  plugins: [
    css({
      preprocessor: 'sass'
    })
  ]
}
