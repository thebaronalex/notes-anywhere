// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import colors from 'vuetify/es5/util/colors'
import firebase from 'firebase'
import App from './App'
import router from './router'
import store from './store/index'
import firebaseConfig from '../firebase-config'
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
// import Vuetify from 'vuetify'

sync(store, router)

// Vue.use(Vuetify, {
//   theme: {
//     primary: colors.indigo.base, // #E53935
//     secondary: colors.teal.lighten4, // #FFCDD2
//     accent: colors.teal.accent3 // #3F51B5
//   }
// })

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
const config = firebaseConfig
// const config = {
//   apiKey: 'AIzaSyAWWY6WvsDpHos6MjRFTZRKR4xRKK3CVhc',
//   authDomain: 'notesanywhere-214120.firebaseapp.com',
//   databaseURL: 'https://notesanywhere-214120.firebaseio.com',
//   projectId: 'notesanywhere-214120',
//   storageBucket: '',
//   messagingSenderId: '963348436377'
// }

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
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

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })
