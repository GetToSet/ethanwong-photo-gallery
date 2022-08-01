import Vue from 'vue'
import App from './App.vue'
import router from './router'

declare global {
  interface Window {
    CUSDIS: any
  }
}

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
