//mencoba integrasi dengan firebase (contoh database)

import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyBsUuN8jrumbROpt5J89Zt2b-lR28s5484",
    authDomain: "projectcarta5.firebaseapp.com",
    projectId: "projectcarta5",
    storageBucket: "projectcarta5.appspot.com",
    messagingSenderId: "280974883891",
    appId: "1:280974883891:web:fd750ad22d516c7601b746"
});

const FIREBASE = firebase;

export default FIREBASE

