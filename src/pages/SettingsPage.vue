<template>
  <v-container fluid class="pa-0">
    <v-tabs
      color="purple"
      dark
      slider-color="purple lighten-3"
    >
      <v-tab
        v-for="i in 3"
        :key="i"
        ripple
      >
        Item {{ i }}
      </v-tab>
    </v-tabs>


    <div class="indigo darken-3 pa-3 text-center">
      <img src="static/img/v.png">
    </div>
    <v-container>
      <h3 class="my-3">Settings</h3>
      <p>
        User Settings go here.
      </p>
      <p>
        This app was made using Vue, Vuetify, Vuex, Vue Router, & Vue CLI. 
      </p>
    </v-container>
  </v-container>
</template>

<script>

</script>
