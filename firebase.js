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
const recentViewsCollection = db.collection('recentViews');

let count = 0;

// Make randomDocs which is a collection of 20 random stories.
async function fetchRandomDocs() {
  count += 1;
  // console.log("fetchRandomDocs", count);
  const querySnapshot = await storiesCollection.orderBy(firebase.firestore.FieldPath.documentId()).get();
  // console.log(querySnapshot.size)
  const randomIndices = [];
  while (randomIndices.length < Math.min(20, querySnapshot.size)) {
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }

  const randomDocs = randomIndices.map((randomIndex) => querySnapshot.docs[randomIndex]);
  randomDocs.forEach((doc) => {
    // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
  // console.log("Here is the content of RandomDocs :" + randomDocs);
  return randomDocs;
}

async function fetchRandomQuote() {
  count += 1;
  // console.log("fetchRandomQuote ", count);
  const querySnapshot = await quoteCollection.orderBy(firebase.firestore.FieldPath.documentId()).get();
  // console.log(querySnapshot.size)
  const randomIndices = [];
  while (randomIndices.length < Math.min(1, querySnapshot.size)) {
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }

  const randomQuote = randomIndices.map((randomIndex) => querySnapshot.docs[randomIndex]);
  randomQuote.forEach((doc) => {
    // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
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

const addRecentView = async (uid, docId, type) => {
  const recentViewsRef = recentViewsCollection.doc(uid);
  const viewsQuerySnapshot = await recentViewsRef.collection('views').where('docId', '==', docId).get();
  if (viewsQuerySnapshot.empty) {
    // docId doesn't exist in views collection, create new document
    const newDocRef = recentViewsRef.collection('views').doc();
    await newDocRef.set({
      docId: docId,
      type: type,
      viewedAt: firebase.firestore.Timestamp.now()
    });
  } else {
    // docId exists in views collection, update timestamp
    const docRef = viewsQuerySnapshot.docs[0].ref;
    await docRef.set({ viewedAt: firebase.firestore.Timestamp.now() }, { merge: true });
  }
};


const getTopViewed = async (uid) => {
  const recentViewsRef = recentViewsCollection.doc(uid);
  const recentViewsSnapshot = await recentViewsRef.collection('views').orderBy('viewedAt', 'desc').limit(5).get();
  const topViewed = [];
  const docPromises = [];
  recentViewsSnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.type == 'Talks') {
      docPromises.push(talksCollection.doc(data.docId).get());
    } else if (data.type == 'AdjustingToMissionaryLife') {
      docPromises.push(adjustingToMissionaryLifeCollection.doc(data.docId).get());
    }
    topViewed.push({
      id: doc.id,
      ...data
    });
  });
  const talkSnapshots = await Promise.all(docPromises);
  talkSnapshots.forEach((snapshot, index) => {
    topViewed[index].talk = snapshot.data();
  });
  return topViewed;
};

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
  addRecentView,
  getTopViewed
};