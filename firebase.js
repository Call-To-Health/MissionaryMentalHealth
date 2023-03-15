// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGwyjHX6vhjsBAXeGMCEZfBOfzwikLDPc",
  authDomain: "missionary-mental-health.firebaseapp.com",
  projectId: "missionary-mental-health",
  storageBucket: "missionary-mental-health.appspot.com",
  messagingSenderId: "733294962332",
  appId: "1:733294962332:web:3b0e8dfddcb1bbec9a2f59"
};

let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore();

const storiesCollection = db.collection('stories');
const journalsCollection = db.collection('journals');

let count = 0;

// Make randomDocs which is a collection of 20 random stories.
async function fetchRandomDocs() {
  count += 1;
  console.log("fetchRandomDocs", count);
  const querySnapshot = await storiesCollection.orderBy(firebase.firestore.FieldPath.documentId()).get();
  console.log(querySnapshot.size)
  const randomIndices = [];
  while (randomIndices.length < Math.min(20, querySnapshot.size)) {
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
}
  const randomDocs = randomIndices.map((randomIndex) => querySnapshot.docs[randomIndex]);
  randomDocs.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
  console.log("Here is the content of RandomDocs :" + randomDocs);
  return randomDocs;
}

export { firebase,journalsCollection, auth, db, fetchRandomDocs};