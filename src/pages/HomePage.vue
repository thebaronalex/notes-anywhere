<template>
  <v-container fluid class="pa-0">
    <div class="indigo darken-3 pa-3 text-center">
      <img src="static/img/v.png">
    </div>
    <v-container>
      <h2>My Notes</h2>
      <p>You currently have no notes. Click the + to create one.</p>
    </v-container>
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
export default {
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
  }
}
</script>
