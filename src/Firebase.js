import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBkW2kCbbJlMy0IzT2gLXAlGaU51fWTleM',
	authDomain: 'clone-learning-d726f.firebaseapp.com',
	projectId: 'clone-learning-d726f',
	storageBucket: 'clone-learning-d726f.appspot.com',
	messagingSenderId: '504888014661',
	appId: '1:504888014661:web:eaac750265f18b1099b02c',
	measurementId: 'G-123ESB2D81',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
