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

// const firebaseConfig = {
//   apiKey: 'AIzaSyAWWY6WvsDpHos6MjRFTZRKR4xRKK3CVhc',
//   authDomain: 'notesanywhere-214120.firebaseapp.com',
//   databaseURL: 'https://notesanywhere-214120.firebaseio.com',
//   projectId: 'notesanywhere-214120',
//   storageBucket: '',
//   messagingSenderId: '963348436377'
// }

// export default firebaseConfig

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
export const auth = firebaseApp.auth()

export default {
  db,
  auth
}
