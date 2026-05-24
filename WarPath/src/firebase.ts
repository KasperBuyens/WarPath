import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAAq4HNRmqKqj_X1XIttC11NsOy4dOVO7w',
  authDomain: 'warpath-37d43.firebaseapp.com',
  projectId: 'warpath-37d43',
  storageBucket: 'warpath-37d43.firebasestorage.app',
  messagingSenderId: '162338628687',
  appId: '1:162338628687:web:14276e0744cf9dd0a4f63a',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
