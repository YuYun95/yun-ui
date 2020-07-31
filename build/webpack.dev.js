const webpack = require('webpack')
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const config = require('./config')

const port = 3000

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hotOnly: true,
    port: port,
    open: true,
    contentBase: './public' // 额外为开发服务器指定查找资源目录
  },
  resolve: {
    // Suffix omitted
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias // config alias
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /mode_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024 * 10,
            esModule: false
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff2|woff|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024 * 10
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new StyleLintWebpackPlugin({
      cache: false,
      files: ['packages/**/*.{vue,html,css,less,scss}', 'examples/**/*.{vue,html,css,less,scss}']
    })
  ]
})
