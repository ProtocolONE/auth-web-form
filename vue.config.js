const path = require('path')
const webpack = require('webpack')

module.exports = {
  lintOnSave: false,

  configureWebpack: {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          stylus: {
            import: [
              path.resolve(__dirname, 'src/styles/variables.styl'),
              path.resolve(__dirname, 'src/styles/mixins.styl')
            ]
          }
        }
      })
    ]
  }
}
