// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from '@/axios/axios'
import i18n from './i18n'
import '@/theme/theme-FF0000/index.css'
import store from '@/store/index'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(router)

Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App)
})
