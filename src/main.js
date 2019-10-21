import Vue from 'vue'
import App from '@/App'

import store from '@/store'
import i18n from '@/i18n'

// eslint-disable-next-line no-new
new Vue({
  store,
  i18n,
  el: '#app',
  render: h => h(App)
})
