import * as firebase from "firebase/app";

import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyAYYs41KC3DqZL-_o4wqD1GGEugnGhPF8E",
    authDomain: "audio-visualizer-7580f.firebaseapp.com",
    databaseURL: "https://audio-visualizer-7580f.firebaseio.com",
    projectId: "audio-visualizer-7580f",
    storageBucket: "audio-visualizer-7580f.appspot.com",
    messagingSenderId: "639471632856",
    appId: "1:639471632856:web:2b49cb621d4a5531a9b2ad",
    measurementId: "G-DB51N4BCSX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const fb = firebase;