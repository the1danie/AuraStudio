// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjY_wzTwU3fPSZTBJ3I5-WVnDC6Lqy0PY",
  authDomain: "aurastudio-3cee7.firebaseapp.com",
  projectId: "aurastudio-3cee7",
  storageBucket: "aurastudio-3cee7.firebasestorage.app",
  messagingSenderId: "53052677606",
  appId: "1:53052677606:web:affc00b837401187520a27",
  measurementId: "G-PLBTLS1Y5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environment
let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Firebase Analytics initialization error:", error);
  }
}

export { app, analytics };

