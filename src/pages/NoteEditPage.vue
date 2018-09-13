<template>
   <v-container fluid>
    <v-layout row>
      <v-flex >
        <v-form>
        <v-text-field
          v-model="note.title"
          name="noteTitle"
          label="Title"
          type="text"
          color="primary"
        ></v-text-field>

          <v-layout align-space-around justify-center row fill-height>
          <v-text-area
              v-model="note.text"
              color="purple"
              name="noteText"
              label="Note Text"
              auto-size="true"
              value=""
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
        @click="updateNote"
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
        this.user = user
        this.noteKey = this.$route.params.noteId
        this.$bindAsObject('note', db.ref(`notes/${this.user.uid}/${this.noteKey}`))
      } else {
        this.$router.replace('login')
      }
    })
  },
  data () {
    return {
      note: {},
      noteKey: ''
    }
  },
  methods: {
    updateNote () {
      this.$firebaseRefs.note.set({
        createdDate: this.note.createdDate,
        modifiedDate: today,
        title: this.note.title,
        text: this.note.text
      })
      this.$router.go(-1)
    }
  }
}
</script>
