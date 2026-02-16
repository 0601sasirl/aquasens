import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration (you'll need to create a Firebase project)
// For demo purposes, we'll use placeholder values
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "aquasens-demo.firebaseapp.com",
  projectId: "aquasens-demo",
  storageBucket: "aquasens-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);