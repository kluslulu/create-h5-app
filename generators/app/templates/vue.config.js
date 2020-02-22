const path = require('path')
const merge = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')
const name = 'snowplus vip'

const proxyTarget = 'https://testvip.snowplus.cn'
module.exports = {
  parallel: false,
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      '/api/v1': {
        target: proxyTarget,
        changeOrigin: true,
        secure: false,
        onProxyReq: (request) => {
          request.setHeader('origin', proxyTarget)
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/variables.scss')
      ]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
  }
}
