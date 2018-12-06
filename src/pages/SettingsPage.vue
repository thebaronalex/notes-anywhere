<template>
  <v-container fluid class="pa-0">
    <!-- <v-tabs
      color="primary"
      dark
      slider-color="primary lighten-3"
    >
      <v-tab
        v-for="i in 3"
        :key="i"
        ripple
      >
        Item {{ i }}
      </v-tab>
    </v-tabs> -->


    <!-- <div class="indigo darken-3 pa-3 text-center">
      <img src="static/img/v.png">
    </div> -->
    <v-container>
      <h3 class="my-3">Settings</h3>

      <v-switch
        label="Dark Theme"
        v-model="settings.darkTheme"
        color="secondary"
      ></v-switch>
    </v-container>

    <v-fab-transition>
      <v-btn
        color="secondary"
        dark
        fab
        fixed
        bottom
        right
        @click="saveSettings"
      >
        <v-icon>check</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import { auth, db } from '../api/firebase'

var today = new Date()
today = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()

export default {
  beforeCreate: function () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$bindAsObject('settings', db.ref(`settings/${user.uid}`))
      } else {
        this.$router.replace('login')
      }
    })
  },
  data () {
    return {
      settings: {
        modifiedDate: today,
        darkTheme: false
      }
    }
  },
  methods: {
    saveSettings () {
      this.$firebaseRefs.settings.set({
        modifiedDate: today,
        darkTheme: this.settings.darkTheme
      })
      this.$router.go(-1)
    }
  }
}
</script>


