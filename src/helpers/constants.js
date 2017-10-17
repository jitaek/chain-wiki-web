import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBD9eX7ABB0Xu1N6CnSdKL-bnsNF5WgLtc",
    authDomain: "chainchronicle-ea233.firebaseapp.com",
    databaseURL: "https://chainchronicle-ea233.firebaseio.com",
    projectId: "chainchronicle-ea233",
    storageBucket: "chainchronicle-ea233.appspot.com",
    messagingSenderId: "1008757887866"
  };

firebase.initializeApp(config);


export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const greenColor = '#68a283';
