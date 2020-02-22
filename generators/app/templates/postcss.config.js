module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 750 / 2,
      viewportHeight: 1334 / 2,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      mediaQuery: false,
      // selectorBlackList: [/van-\w+/,/base-\w+/]
    }
  }
}
