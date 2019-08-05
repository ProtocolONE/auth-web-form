import Vue from 'vue'
import Example from '@/Example'

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(Example)
})
