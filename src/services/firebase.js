
import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyAjDwHklmKc3-LF423GANBX1J6tv-r0gI8',
  authDomain: 'jazz-e2320.firebaseapp.com',
  databaseURL: 'https://jazz-e2320.firebaseio.com',
  projectId: 'jazz-e2320',
  storageBucket: '',
  messagingSenderId: '257266509451'
})

export const db = firebaseApp.database()
