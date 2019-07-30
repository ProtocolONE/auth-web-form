import Vue from 'vue'
import Login from '@/Login'

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(Login)
})
