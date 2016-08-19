'use strict'
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const appPkg = require('../app/package')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: process.cwd() + '/app/dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.css', '.json', '.png', '.ttf'],
    alias: {
      src: path.join(__dirname, '../src'),
      utils: path.join(__dirname, '../src/utils'),
      components: path.join(__dirname, '../src/components'),
      assets: path.join(__dirname, '../src/assets'),
      css: path.join(__dirname, '../src/css'),
      fonts: path.join(__dirname, '../src/fonts'),
      directives: path.join(__dirname, '../src/directives')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.vue$/,
        loaders: ['vue']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: /\.svg$/,
        loaders: ['svg-inline']
      },
      {
        test: /\.(png|ttf)$/,
        loaders: ['url-loader']
      }
    ]
  },
  babel: {
    presets: ['es2015', 'stage-1'],
    plugins: ['transform-runtime']
  },
  vue: {
    autoprefixer: false,
    postcss: [
      require('postcss-nested'),
      require('postcss-simple-vars'),
      require('postcss-import')(),
      require('postcss-mixins')
    ],
    loaders: {
      css: ExtractTextPlugin.extract(
        'vue-style-loader',
        'css-loader?sourceMap'
      )
    }
  },
  target: 'electron',
  plugins: [
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '../src/static'),
      to: 'static'
    }], {copyUnmodified: true}),
    new webpack.ExternalsPlugin('commonjs2', Object.keys(appPkg.dependencies)),
    new ExtractTextPlugin('style.css')
  ]
}
