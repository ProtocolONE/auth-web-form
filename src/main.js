import Vue from 'vue'

import App from '@/App.vue'
import BaseButton from '@/components/BaseButton'

import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'

Vue.component('base-button', BaseButton)
Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
