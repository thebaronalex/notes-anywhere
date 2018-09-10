<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8 lg6>
            <v-card class="elevation-2">
              <v-card-text @keyup.enter="signIn">
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    required
                    prepend-icon="person"
                    name="email"
                    label="Email"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                  ></v-text-field>
                </v-form>

                <div v-if="loginError">
                  <span class="red--text"> {{ loginError }} </span>
                  <br>
                </div>
                <div>If you do not have an account, you can sign up <router-link to="/sign-up">here.</router-link></div>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="signIn" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import { mapActions } from 'vuex'
import { auth } from '../api/firebase'

export default {
  data () {
    return {
      loginError: '',
      email: '',
      password: '',
      emailRules: [
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    signIn: function () {
      if (this.$refs.form.validate()) {
        auth.signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.login()
            this.$router.replace('notes')
          },
          (err) => {
            this.logout()
            this.loginError = err.message
            this.loginErrorDetail = err.code
          }
        )
      }
    },
    ...mapActions([
      'login',
      'logout'
    ])
  }
}
</script>
