const path = require('path');

process.env.VUE_APP_BACKEND_URI = process.env.BACKEND_URI;

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: process.env.BACKEND_URI,
        secure: false
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import 'src/assets/styles/_variables.scss';
        @import 'src/assets/styles/_mixins.scss';
        `
      }
    }
  },
  chainWebpack: config =>
    config.resolve.alias
      .set('@', path.resolve('src'))
      .end()
      .end()
      .module.rule('svg')
      .uses.clear()
      .end()
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('svg-inline-loader')
      .loader('svg-inline-loader')
      .end()
      .end()
      .oneOf('url')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'img/[name].[hash:8].[ext]'
      })
};
