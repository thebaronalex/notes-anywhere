<template>
  <v-container>
    <div v-if="errMessage">
      <h3 class="my-3">Logout Error!</h3>
      <p>
        Oops, something went wrong trying to log you out.
      </p>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { auth } from '../api/firebase'

export default {
  data () {
    return {
      errMessage: ''
    }
  },
  mounted () {
    this.signOut()
  },
  methods: {
    signOut () {
      auth.signOut().then(() => {
        this.logout()
        this.$router.replace('login')
      })
    },
    ...mapActions([
      'logout'
    ])
  }
}
</script>
