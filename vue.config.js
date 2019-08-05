const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  css: {
    extract: false,
    loaderOptions: {
      stylus: {
        import: [
          path.resolve(__dirname, 'src/styl/variables.styl'),
          path.resolve(__dirname, 'src/styl/mixins.styl')
        ]
      }
    }
  },

  configureWebpack: {
    output: {
      filename: 'auth-web-form.js'
    },
    optimization: {
      splitChunks: false
    },
    plugins: [
      new Dotenv()
    ]
  }
}
