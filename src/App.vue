<template>
  <v-app :dark="settings.darkTheme">
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer" 
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              <span>{{ username }}</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list v-for="item in allItems" :key="item.id">
          <v-list-tile :href="item.href" :to="{name: item.href}" :key="item.id">

            <v-list-tile-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title 
              
              v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      class="accent"
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-btn v-if="showBackButton" icon @click="goBack">
        <v-icon>chevron_left</v-icon>
      </v-btn>
      <v-btn v-else icon disabled>
        <v-icon></v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <!-- <v-icon class="mx-3">fab fa-youtube</v-icon> -->
      <!-- <img src="static/img/logo-120x120.png"> -->
      <img src="static/img/icons/favicon-32x32.png">

      <!-- <v-toolbar-title v-text="title" class="font-weight-light"></v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <v-btn
          slot="activator"
          dark
          icon
        >
          <v-icon>more_vert</v-icon>
        </v-btn>

        <v-list>
          <v-list-tile :to="{name :'notes-delete'}">
            <v-list-tile-title> Delete Notes </v-list-tile-title>
          </v-list-tile>

          <v-list-tile 
            v-if="installButton"
            @click="installApp"
          >
            <v-list-tile-title> Install App </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <!-- ************************************ -->
    <v-content>
      <router-view/>
    </v-content>
    <!-- ************************************ -->

  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { auth, db } from './api/firebase'

export default {
  data () {
    return {
      username: 'Menu',
      clipped: false,
      drawer: false, // TODO: Set to true when in desktop mode
      fixed: false,
      miniVariant: false,
      title: 'Notes Anywhere',
      deferredPrompt: null,
      installButton: true,
      // dark: false,
      settings: {
        modifiedDate: null,
        darkTheme: false
      }
    }
  },
  beforeCreate: function () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.username = user.email
        this.$bindAsArray('notes', db.ref(`notes/${user.uid}`))

        this.$bindAsObject('settings', db.ref(`settings/${user.uid}`))
        // console.log(this.notes[1]['.key'])
      } else {
        this.$router.replace('login')
      }
    })
  },
  created () {
    window.addEventListener('beforeinstallprompt', function (e) {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      console.log('before install prompt event listener')
      this.installButton = true
      e.preventDefault()
      // e.prompt()
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e

      this.deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt')
          } else {
            console.log('User dismissed the A2HS prompt')
          }
          this.deferredPrompt = null
        })
    })
  },
  mounted () {
    // TODO: find a way to use (this.userLoggedIn), this will negate the need to import firebase auth
    if (auth.currentUser) {
      this.login()
    } else {
      this.logout()
    }
  },
  computed: {
    ...mapGetters([
      'allItems'
    ]),
    showBackButton () {
      console.log(this.$route.path)
      return (this.$route.path !== '/notes')
    },
    notesExist () {
      return (this.notes.length === 0) && (!this.user)
    }
  },
  methods: {
    installApp: function (e) {
      console.log('call this.deferredPrompt.prompt()')
      this.deferredPrompt.prompt('')

      this.deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt')
          } else {
            console.log('User dismissed the A2HS prompt')
          }
          this.deferredPrompt = null
        })
    },
    goBack () {
      this.$router.go(-1)
    },
    ...mapActions([
      'login',
      'logout'
    ])
  }
}
</script>
