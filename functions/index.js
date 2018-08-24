const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./create_user');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://one-time-password-fbb48.firebaseio.com"
  }); 
  
exports.createUser = functions.https.onRequest(createUser);