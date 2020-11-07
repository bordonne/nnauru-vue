// Vue config file

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import '${process.env.VUE_APP_THEME}';`
      }
    }
  }
}
