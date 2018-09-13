<template>
  <v-container fluid class="pa-0">
    <!-- <div class="indigo darken-3 pa-3 text-center">
      <img src="static/img/v.png">
    </div> -->
    <v-container v-if="notesExist">
      <h2>My Notes</h2>
      <p>You currently have no notes. Click the + to create one.</p>

      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-container>
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
              <v-card 
                class="elevation-4" 
                tile 
                ripple
                pa-0 

                :to="{ name: 'note-edit', params: { noteId: note['.key'] }}"
                >
                <!-- 
                :to="{ name :'note-edit'}"
                :to="{ name :'note-edit', params: {note.id}}" 
                -->

                <v-card-text
                  value=""
                  height="400px"
                  class="pb-2"
                >

                  <!-- <v-layout align-center>
                    <v-checkbox v-model="note.selected" hide-details class="shrink mr-2"></v-checkbox> -->

                    <div v-bind:class="{ noteContentSmall: isSmallBinding, noteContentLarge: !isSmallBinding }">
                      <h3>
                        {{note.title}}
                      </h3>
                      <p>
                        <span style="white-space: pre-wrap;">{{note.text}}</span>
                      </p>
                    </div>
                  <!-- </v-layout> -->
                </v-card-text>
              <v-divider light></v-divider>
              <v-card-actions class="pa-1 pr-3">
                <v-spacer></v-spacer>
                Created {{ note.createdDate }} \\ Modified {{ note.modifiedDate }}
                <!-- 
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon> -->
              </v-card-actions>
            </v-card>
              <!-- </v-card> -->

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
        :to="{name :'note-add'}"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import { auth, db } from '../api/firebase'

export default {
  beforeCreate: function () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.$bindAsArray('notes', db.ref(`notes/${user.uid}`))
        // console.log(this.notes[1]['.key'])
      } else {
        this.$router.replace('login')
      }
    })
  },
  data () {
    return {
      user: {},
      notes: {}
    }
  },
  computed: {
    isSmallBinding () {
      var binding
      if (this.$vuetify.breakpoint.mdAndDown) binding = true
      return binding
    },
    notesExist () {
      return (this.notes.length === 0) && (!this.user)
    }
  }
}
</script>

<style>
.noteContentSmall {
    line-height: 1.5em;
    height: 6em;       /* height is {n} times the line-height */
    overflow: hidden;  /* prevents extra lines from being visible */
}
.noteContentLarge {
    line-height: 1.5em;
    height: 15em;       /* height is {n} times the line-height */
    overflow: hidden;  /* prevents extra lines from being visible */
}
</style>
