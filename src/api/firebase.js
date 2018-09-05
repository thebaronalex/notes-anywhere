// import Firebase from 'firebase'
import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyAWWY6WvsDpHos6MjRFTZRKR4xRKK3CVhc',
  authDomain: 'notesanywhere-214120.firebaseapp.com',
  databaseURL: 'https://notesanywhere-214120.firebaseio.com',
  projectId: 'notesanywhere-214120',
  storageBucket: '',
  messagingSenderId: '963348436377'
})

var userRef

firebaseApp.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // var uid = user.uid
    // var userName = user.isAnonymous
    userRef = user

    console.log(userRef)

    // var useridRef = userRef.child(firebaseApp.userid)

    // useridRef.set({
    //   locations: "",
    //   theme: "",
    //   colorScheme: "",
    //   food: ""
    // });
  } else {
    // User is signed out.
    // ...
    userRef = null
  }
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
export const auth = firebaseApp.auth()

export default {
  db,
  auth,
  userRef
}
