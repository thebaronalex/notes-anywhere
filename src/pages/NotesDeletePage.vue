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
              v-for="(note, index) in items" 
              :key="note.id"
            >
              <v-card
                class="elevation-4" 
                tile 
                ripple
                pa-0 >
                <v-card-text
                  value=""
                  height="400px"
                  @click="noteSelect(checkboxes[index], note)"
                >

                  <v-layout align-center>
                    <v-checkbox @click.prevent hide-details :key="note.id" v-model="checkboxes[index].checked" class="shrink mr-2"> </v-checkbox>

                    <div v-bind:class="{ noteContentSmall: isSmallBinding, noteContentLarge: !isSmallBinding }">
                      <h3>
                        {{note.title}}
                      </h3>
                      <p>
                        <span style="white-space: pre-wrap;">{{note.text}}</span>
                      </p>
                    </div>
                  </v-layout>



                  <!-- <v-layout align-center> -->
                    <!-- <v-checkbox :key="note.id" v-model="note.selected" class="shrink mr-2"></v-checkbox> -->

                  <!-- <v-checkbox disabled :key="note.id" :label="note.title" :value="note.id" v-model="checkboxes[index].checked">
      

                    <div v-bind:class="{ noteContentSmall: isSmallBinding, noteContentLarge: !isSmallBinding }">
                      <h3>
                        {{note.title}}
                      </h3>
                      <p>
                        <span style="white-space: pre-wrap;">{{note.text}}</span>
                      </p>
                    </div>

                  </v-checkbox> -->

                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>

    <v-fab-transition>
      <v-btn
        color="red"
        dark
        fab
        fixed
        bottom
        right
        @click="deleteNotes"
      >
        <v-icon>remove</v-icon>
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
      } else {
        this.$router.replace('login')
      }
    })
  },
  data () {
    return {
      user: {},
      notes: [],
      checkboxes: []
    }
  },
  computed: {
    items () {
      this.checkboxes = this.notes.map(note => {
        return {
          checked: false,
          note
        }
      })
      return this.notes
    },
    isSmallBinding () {
      var binding
      if (this.$vuetify.breakpoint.mdAndDown) binding = true
      return binding
    },
    notesExist () {
      return (this.notes.length === 0) && (!this.user)
    }
  },
  methods: {
    noteSelect (checkbox, note) {
      if (checkbox.checked) {
        checkbox.checked = false
      } else {
        checkbox.checked = true
      }
    },
    deleteNotes () {
      var arrayLength = this.checkboxes.length
      for (var i = 0; i < arrayLength; i++) {
        if (this.checkboxes[i].checked) {
          db.ref(`notes/${this.user.uid}`).child(this.checkboxes[i].note['.key']).remove()
        }
      }
      this.$router.replace('notes')
    }
  }
}
</script>

<style>
.noteContentSmall {
    line-height: 1.5em;
    height: 4.5em;       /* height is {n} times the line-height */
    overflow: hidden;  /* prevents extra lines from being visible */
}
.noteContentLarge {
    line-height: 1.5em;
    height: 15em;       /* height is {n} times the line-height */
    overflow: hidden;  /* prevents extra lines from being visible */
}
</style>
