import Vue from 'vue'
import vuex from 'vuex'
import common from '@/store/common'
Vue.use(vuex)

export default new vuex.Store({
  modules: {
    common: common
  }
})
