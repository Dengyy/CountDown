'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const utils = require('./utils')

const DEBUG = process.argv.slice(2) != '--release'

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    vendor: [
      'es5-shim',
      'es5-shim/es5-sham',
      'es6-promise',
      'babel-polyfill'
    ]
  },
  module: {
    loaders: [
      ...utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true
      }),
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            'react',
            'es2015-loose',
            'stage-1',
          ],
          plugins: [
            'transform-runtime',
            'transform-react-remove-prop-types',
            'transform-react-constant-elements',
            'transform-react-inline-elements',
            'transform-es3-modules-literals',
            'transform-es3-member-expression-literals',
            'transform-es3-property-literals'
          ]
        }
      }
    ]
  },
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: 'https://dengyy.github.io/CountDown/dist/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': DEBUG ? config.env.uat : config.env.prod
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'Count Down',
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      // favicon: 'client/assets/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})

if (!DEBUG) {
  webpackConfig.plugins.push(new webpack.optimize.DedupePlugin())
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false, screw_ie8: false },
    mangle: { screw_ie8: false },
    output: { comments: false, screw_ie8: false }
  }))
  webpackConfig.plugins.push(new webpack.optimize.AggressiveMergingPlugin())
}

if (!DEBUG && config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
