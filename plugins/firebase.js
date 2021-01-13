import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import config from './../firebaseConfig.json'

// "..."はスプレッド構文
if (!firebase.apps.length) {
  firebase.initializeApp({
    ...config
  })
}

export default ({ app }, inject) => {
  inject('firebase', firebase)
  inject('firestore', firebase.firestore())
  inject('fireStorage', firebase.storage())
  inject('fireAuth', firebase.auth())
}
