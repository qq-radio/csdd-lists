var webpack = require('webpack');

module.exports = {
  publicPath: ./,
  outputDir: "dist",
  assetsDir: "./static",
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9001',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  configureWebpack: {
  },

  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'cn',
      fallbackLocale: 'cn',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  }
}
