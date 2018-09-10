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
                    required
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    v-model="repeatPassword"
                    required
                    :rules="passwordRules"
                    prepend-icon="lock"
                    name="repeatPassword"
                    label="Repeat Password"
                    id="repeatPassword"
                    type="password"
                  ></v-text-field>
                </v-form>
                <br>
                <div v-if="signUpError">
                  <span class="red--text"> {{ signUpError }} </span>
                </div>

                <div v-if="loginError">
                  <span class="red--text"> {{ loginError }} </span>
                </div>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="signUp" color="primary">Sign Up</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import { auth } from '../api/firebase'

export default {
  data () {
    return {
      signUpError: '',
      loginError: '',
      email: '',
      password: '',
      repeatPassword: '',
      emailRules: [
        // v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => v === this.password || 'Passwords do not match'
      ]
    }
  },
  methods: {
    signUp: function () {
      if (this.$refs.form.validate()) {
        auth.createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            // this.$router.replace('notes')

            auth.signInWithEmailAndPassword(this.email, this.password).then(
              (user) => {
                // this.login()  TODO : hook this up, maybe find a better way of doing it that importing the vuex state
                this.$router.replace('notes')
              },
              (err) => {
                // this.logout()  TODO : hook this up, maybe find a better way of doing it that importing the vuex state
                this.loginError = err.message
              }
            )
          },
          (err) => {
            this.signUpError = err.message
          }
        )
      } else {
        this.signUpError = ''
        this.loginError = ''
      }
    }
  }
}
</script>
