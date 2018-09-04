// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import colors from 'vuetify/es5/util/colors'
// import firebase from 'firebase/app'
// import 'firebase/auth'
import App from './App'
import router from './router'
import store from './store/index'
import VueFire from 'vuefire'
import { auth } from './api/firebase'
// import firebaseConfig from '../firebase-config'
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
    transitions
  },
  theme: {
    primary: colors.indigo.base, // '#ee44aa',
    secondary: colors.teal.lighten4, // '#424242',
    accent: colors.teal.accent3, // '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

// Initialize Firebase
let app
// const config = firebaseConfig

// firebase.initializeApp(config)

// var usersRef = firebase.database().ref('users')

// firebase.auth()
auth.onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      // firebase,
      components: { App },
      template: '<App/>'
    })
  }
})
