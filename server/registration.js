import Vue from 'vue'
import Registration from '@/Registration'

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(Registration)
})
