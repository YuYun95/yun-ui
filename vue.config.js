const stylelintWebpackPlugin = require('stylelint-webpack-plugin')

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    plugins: [
      // eslint-disable-next-line new-cap
      new stylelintWebpackPlugin({
        cache: false,
        files: ['packages/**/*.{vue,html,css,less,scss}']
      })
    ]
  }
}
