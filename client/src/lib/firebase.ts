import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// This is just a placeholder configuration for design purposes
// Actual implementation will use environment variables later
const firebaseConfig = {
  apiKey: "placeholder",
  authDomain: "placeholder.firebaseapp.com",
  projectId: "placeholder",
  storageBucket: "placeholder.appspot.com",
  messagingSenderId: "placeholder",
  appId: "placeholder"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);