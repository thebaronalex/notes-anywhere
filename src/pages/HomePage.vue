<template>
  <v-container fluid class="pa-0">
    <div class="indigo darken-3 pa-3 text-center">
      <img src="static/img/v.png">
    </div>
    <!-- <v-container>
      <h2>My Notes</h2>
      <p>You currently have no notes. Click the + to create one.</p>
    </v-container> -->


    <!-- <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex>
          <v-card dark color="primary">
            <v-card-text>one</v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card dark color="secondary">
            <v-card-text>two</v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card dark color="accent">
            <v-card-text>three</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container> -->

    <v-layout>
      <v-flex >
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              xs12
              md6
              lg3
              v-for="note in notes"
              :key="note.id"
            >
              <v-card tile>
                <v-card-text
                  value=""
                  height="400px"
                >
                  <h3>
                    {{note.title}}
                  </h3>
                  The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>

    <v-fab-transition>
      <v-btn
        color="purple"
        dark
        fab
        fixed
        bottom
        right
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
// import firebase from 'firebase/app'
// import 'firebase/auth'
import { db } from '../api/firebase'
// var notesRef = firebase.database().ref('notes')

export default {
  data () {
    return {
      notes: {}
    }
  },
  // firebase: {
  //   notes: notesRef
  // },
  mounted () {
  },
  methods: {
  },
  computed: {
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.mdAndDown) binding.column = true
      return binding
    }
  },
  firebase: {
    notes: {
      source: db.ref('notes')
      // Optional, allows you to handle any errors.
      // cancelCallback(err) {
      //   console.error(err);
      // }
    }
  }
}
</script>
