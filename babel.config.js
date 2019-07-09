module.exports = {
  presets: [
    '@vue/app'
  ],

  plugins: [
    ['transform-imports', {
      'lodash-es': {
        // eslint-disable-next-line no-template-curly-in-string
        'transform': 'lodash-es/${member}',
        'preventFullImport': true
      }
    }]
  ]
}
