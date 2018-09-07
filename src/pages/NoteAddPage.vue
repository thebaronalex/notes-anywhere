<template>
   <v-container fluid>
    <!--<v-layout column>
      <v-flex > -->
        <v-form>
        <v-text-field
          v-model="noteTitle"
          name="noteTitle"
          label="Title"
          type="text"
        ></v-text-field>
         <!-- <v-layout align-space-around justify-center row fill-height> -->
          <v-text-area
              name="input-7-1"
              label="Note Text"
              fill-height
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              hint="Hint text"
          ></v-text-area>
        </v-form>
        <!-- </v-layout>
      </v-flex>
    </v-layout>-->
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