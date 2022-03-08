import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  lazyComponent: true,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
