import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL7Lh0KBFg3k_nxUfaX6jA1cBRYvGVkuc",
  authDomain: "netflix-clone-31eb1.firebaseapp.com",
  projectId: "netflix-clone-31eb1",
  storageBucket: "netflix-clone-31eb1.appspot.com",
  messagingSenderId: "275388709376",
  appId: "1:275388709376:web:e8a98ce6d4271c54f066bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;