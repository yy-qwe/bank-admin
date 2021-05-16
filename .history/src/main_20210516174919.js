import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission'
import { mockXHR } from '../mock'

if (process.env.NODE_ENV === 'production') { mockXHR() }

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
