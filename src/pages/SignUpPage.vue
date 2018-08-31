<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-2">
              <v-card-text>
                <v-form>
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
                <div v-if="signUpError">{{ signUpError }}</div>
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
import firebase from 'firebase'

export default {
  data () {
    return {
      signUpError: '',
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
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('notes')
          },
          (err) => {
            this.signUpError = err.message
          }
        )
      }
    }
  }
}
</script>
