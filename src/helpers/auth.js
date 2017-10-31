import firebase from 'firebase'
import { ref } from './constants'

export const firebaseAuth = firebase.auth()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const facebookProvider = new firebase.auth.FacebookAuthProvider()

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

export const storageKey = 'firebaseAuthKey'

export const isAuthenticated = () => {
  return !!firebase.auth().currentUser || !!localStorage.getItem(storageKey)
}