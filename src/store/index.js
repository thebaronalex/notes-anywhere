import Vuex from 'vuex'
import Vue from 'vue'
import drawer from './drawer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    drawer
  }
})
