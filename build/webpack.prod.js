const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  optimization: {
    usedExports: true,
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
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
        test: /\.css?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new CopyWebpackPlugin({ patterns: ['public', 'examples/assets'] })
  ]
})
