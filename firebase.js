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
const quoteCollection = db.collection('Quotes')
const journalsCollection = db.collection('journals');
const adjustingToMissionaryLifeCollection = db.collection('AdjustingToMissionaryLife');
const talksCollection = db.collection('Talks');
const userContentCollection = db.collection('userContent');

let count = 0;

// Make randomDocs which is a collection of 20 random stories.
async function fetchRandomDocs() {
  count += 1;
  const querySnapshot = await storiesCollection.orderBy(firebase.firestore.FieldPath.documentId()).get();
  const randomIndices = [];
  while (randomIndices.length < Math.min(20, querySnapshot.size)) {
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }
  

  const randomDocs = randomIndices.map((randomIndex) => querySnapshot.docs[randomIndex]);
  randomDocs.forEach((doc) => {
  });
  return randomDocs;
}

async function fetchRandomQuote() {
  count += 1;
  const querySnapshot = await quoteCollection.orderBy(firebase.firestore.FieldPath.documentId()).get();
  const randomIndices = [];
  while (randomIndices.length < Math.min(1, querySnapshot.size)) {
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }

  const randomQuote = randomIndices.map((randomIndex) => querySnapshot.docs[randomIndex]);
  randomQuote.forEach((doc) => {
  });
  console.log("Here is the content of RandomQuote from firebase.js :" + randomQuote);
  return randomQuote;
}

const fetchJournals = async () => {
  const snapshot = await journalsCollection.get();
  const journalDocs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return journalDocs;
};

async function getAdjustingToMissionaryLifeData() {
  const snapshot = await adjustingToMissionaryLifeCollection.orderBy('chapter').get();
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return data;
}


// journalsCollection.get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data()}`);
//   });
// });

async function getTalksData() {
  const talksRef = firebase.firestore().collection('Talks').orderBy('title');
  const snapshot = await talksRef.get();

  const talks = [];
  snapshot.forEach((doc) => {
    talks.push({ id: doc.id, ...doc.data() });
  });

  return talks;
}

async function getUserProfile(uid) {
  const userContentRef = userContentCollection.doc(uid);
  const userContentSnapshot = await userContentRef.get();
  if (userContentSnapshot.exists) {
    const userInfo = userContentSnapshot.data();
    return {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      gender: userInfo.gender
    };
  } else {
    console.log('User not found in userContent collection');
    return null;
  }
}

const addRecentView = async (uid, docId, type) => {
  const userContentCollectionRef = userContentCollection.doc(uid);
  const newDocRef = userContentCollectionRef.collection('views').doc();
  await newDocRef.set({
    docId: docId,
    type: type,
    viewedAt: firebase.firestore.Timestamp.now()
  });
};


const getTopViewed = async (uid) => {
  const recentViewsRef = userContentCollection.doc(uid);
  const recentViewsSnapshot = await recentViewsRef.collection('views').orderBy('viewedAt', 'desc').get();
  const topViewed = [];
  const docIds = new Set(); // keep track of unique docIds

  recentViewsSnapshot.forEach((doc) => {
    const data = doc.data();
    const docId = data.docId;

    if (!docIds.has(docId)) { // only add to topViewed if docId is unique
      if (data.type === 'Talks') {
        topViewed.push({
          id: doc.id,
          docId: docId,
          type: 'Talks'
        });
      } else if (data.type === 'AdjustingToMissionaryLife') {
        topViewed.push({
          id: doc.id,
          docId: docId,
          type: 'AdjustingToMissionaryLife'
        });
      }

      docIds.add(docId); // add docId to set of unique docIds
    }

    // exit loop when we have top 5 unique docIds
    if (docIds.size === 5) {
      return false;
    }
  });

  const docPromises = topViewed.map((doc) => {
    if (doc.type === 'Talks') {
      return talksCollection.doc(doc.docId).get();
    } else if (doc.type === 'AdjustingToMissionaryLife') {
      return adjustingToMissionaryLifeCollection.doc(doc.docId).get();
    }
  });

  const talkSnapshots = await Promise.all(docPromises);
  talkSnapshots.forEach((snapshot, index) => {
    topViewed[index].talk = snapshot.data();
  });

  return topViewed;
};




export { 
  firebase, 
  journalsCollection, 
  auth, 
  db, 
  fetchRandomDocs, 
  fetchRandomQuote,
  fetchJournals,
  getAdjustingToMissionaryLifeData,
  getTalksData,
  getUserProfile,
  addRecentView,
  getTopViewed
};