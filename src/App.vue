<template>
  <v-app>
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
              <span>Menu</span>
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
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      class="primary"
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-btn icon @click="goBack">
        <v-icon>chevron_left</v-icon>
      </v-btn>
      
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn> -->
      
      <v-toolbar-title v-text="title" class="font-weight-light"></v-toolbar-title>
      
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
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data () {
    return {
      clipped: false,
      drawer: false, // TODO: Set to true when in desktop mode
      fixed: false,
      miniVariant: false,
      title: 'Notes Anywhere'
    }
  },

  mounted () {
    // TODO: find a way to use (this.userLoggedIn), this will negate the need to import firebase
    if (firebase.auth().currentUser) {
      this.login()
    } else {
      this.logout()
    }
  },
  computed: {
    ...mapGetters([
      'allItems',
      'userLoggedIn'
    ])
  },
  methods: {
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
