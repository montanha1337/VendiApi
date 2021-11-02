// Import the functions you need from the SDKs you need
import firebase from "firebase/app";

  // Set the configuration for your app
  // TODO: Replace with your app's config object
  var firebaseConfig = {
    apiKey: '"AIzaSyAgbdpzrvvDgceKoAVH4naCDuzxPgaI1PM"',
    authDomain: 'vendi-527e3.firebaseapp.com',
    projectId: "vendi-527e3",
  storageBucket: "vendi-527e3.appspot.com",
  messagingSenderId: "250439411600",
  appId: "1:250439411600:web:3ae7720f2e64aaeab47515"
  };
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
module.exports={firebaseConfig, storage}