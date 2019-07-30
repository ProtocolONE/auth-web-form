import Vue from 'vue'
import AuthExample from '@/AuthExample'

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(AuthExample)
})
