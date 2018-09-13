// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'
import store from './store/index'
import colors from 'vuetify/es5/util/colors'
import { auth } from './api/firebase'
import { sync } from 'vuex-router-sync'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  VDivider,
  VForm,
  VTextField,
  VTextArea,
  VTabs,
  VMenu,
  VCheckbox,
  VProgressCircular,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

sync(store, router)

Vue.use(VueFire)
Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VDivider,
    VForm,
    VTextField,
    VTextArea,
    VTabs,
    VMenu,
    VCheckbox,
    VProgressCircular,
    transitions
  },
  theme: {
    primary: colors.indigo.base, // '#ee44aa',
    secondary: colors.teal.base, // '#424242',
    accent: colors.teal.accent3, // '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

let app

auth.onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  }
})
