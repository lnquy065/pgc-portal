import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAr927dYFlChHnrCkGJGlT8VvxnsyjEoHU",
    authDomain: "ptitguitarclub.firebaseapp.com",
    databaseURL: "https://ptitguitarclub.firebaseio.com",
    projectId: "ptitguitarclub",
    storageBucket: "ptitguitarclub.appspot.com",
    messagingSenderId: "263674400063",
    appId: "1:263674400063:web:2a06efbd580bfe30"
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const sg = firebase.storage()