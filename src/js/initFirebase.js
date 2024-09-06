import firebaseConfig from '../js/firebase.js'

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app'
import 'firebase/compat/messaging'

import 'firebase/compat/auth'
firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

// export { firebase, signOut, auth }
export { firebase }
