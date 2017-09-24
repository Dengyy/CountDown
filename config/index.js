'use strict'

const path = require('path')
const distPath = '../dist'

module.exports = {
  build: {
    index: path.resolve(__dirname, distPath + '/index.html'),
    assetsRoot: path.resolve(__dirname, distPath),
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    port: process.env.DEV_PORT || 8080,
    autoOpenBrowser: true,
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  env: {
    dev: require('./dev.env'),
    uat: require('./test.env'),
    prod: require('./prod.env')
  }
}
