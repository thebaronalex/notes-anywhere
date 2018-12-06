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
              color="primary"
              name="noteText"
              label="Note Text"
              auto-size="true"
              value=""
              rows="15"
            ></v-text-area>
          </v-layout> 
        </v-form>
      </v-flex>
    </v-layout>
    
    <v-fab-transition>
      <v-btn
        color="secondary"
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
      }
    })
  },
  data () {
    return {
      noteTitle: '',
      noteText: ''
    }
  },
  methods: {
    addNote () {
      this.$firebaseRefs.notes.push({
        createdDate: today,
        modifiedDate: today,
        modifiedDateRev: -1 * today,
        title: this.noteTitle,
        text: this.noteText
      })
      this.$router.replace('notes')
    }
  }
}
</script>