<template>
   <v-container fluid>
    <v-layout row>
      <v-flex >
        <v-form>
        <v-text-field
          v-model="noteTitle"
          name="noteTitle"
          label="Title"
          type="text"
          color="primary"
        ></v-text-field>

          <v-layout align-space-around justify-center row fill-height>
          <v-text-area
              v-model="noteText"
              color="purple"
              name="noteText"
              label="Note Text"
              auto-size="true"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              hint="Hint text"
          ></v-text-area>

           </v-layout> 

        </v-form>
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
        @click="addNote"
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
        this.uid = user.uid
        this.$bindAsArray('notes', db.ref(`notes/${user.uid}`))
        //this.noteTitle = notes.child(). $route.params.id }}

        //db.ref(`notes/${this.user.uid}`).child(this.checkboxes[i].note['.key']).
      }
    })
  },
  data () {
    return {
      // notes: {},
      noteTitle: '',
      noteText: ''
    }
  },
  methods: {
    addNote () {
      this.$firebaseRefs.notes.push({
        createdDate: today,
        title: this.noteTitle,
        text: this.noteText
      })
      this.$router.replace('notes')
    }
  }
//   firebase: {
//     notes: {
//       source: db.ref('notes/' + this.uid).equalTo($route.params.id, 'title'), // + auth.currentUser.uid + '/')
//       // Optional, allows you to handle any errors.
//       cancelCallback (err) {
//         console.error(err)
//       }
//     }
//   }
}
</script>