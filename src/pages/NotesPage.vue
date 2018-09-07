<template>
  <v-container fluid class="pa-0">
    <!-- <div class="indigo darken-3 pa-3 text-center">
      <img src="static/img/v.png">
    </div> -->
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
                  <p>
                    {{note.text}}
                  </p>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>

    <!-- <v-layout>
      <v-flex >
        <v-container fluid grid-list-md>
          <v-card class="elevation-2">
            <v-card-text>
              <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="noteTitle"
                name="noteTitle"
                label="Title"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="noteText"
                name="noteText"
                label="Text"
                type="text"
              ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="addNote" color="primary">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout> -->

    <v-fab-transition>
      <v-btn
        color="purple"
        dark
        fab
        fixed
        bottom
        right
        :to="{name :'note-add'}"
      >
        <v-icon>add</v-icon>
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
        this.user = user
        this.uid = user.uid
        this.$bindAsArray('notes', db.ref(`notes/${user.uid}`))
      }
    })
  },
  data () {
    return {
      notes: {},
      noteTitle: '',
      noteText: ''
    }
  },
  mounted () {
  },
  methods: {
    addNote () {
      this.$firebaseRefs.notes.push({
        createdDate: today,
        title: this.noteTitle,
        text: this.noteText
      })
    }
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
      source: db.ref('notes/' + this.uid), // + auth.currentUser.uid + '/')
      // Optional, allows you to handle any errors.
      cancelCallback (err) {
        console.error(err)
      }
    }
  }
}
</script>
