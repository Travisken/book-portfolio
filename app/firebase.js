import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYqAo7GAsmJDvWpg31p_b-nucOFt3yqQs",
  authDomain: "book-portfolio-4eccb.firebaseapp.com",
  projectId: "book-portfolio-4eccb",
  storageBucket: "book-portfolio-4eccb.firebasestorage.app",
  databaseURL: "https://book-portfolio-4eccb-default-rtdb.firebaseio.com/",
  messagingSenderId: "586599627581",
  appId: "1:586599627581:web:1a5cb5bf5614044f23a354",
  measurementId: "G-7V9BQZBCQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, database, storage }