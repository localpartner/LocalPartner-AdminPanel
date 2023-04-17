import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjfwHWDhzjnY8DCn7q3Q9E59pMmy95C2Y",
  authDomain: "keastore-b6099.firebaseapp.com",
  projectId: "keastore-b6099",
  storageBucket: "keastore-b6099.appspot.com",
  messagingSenderId: "470309241646",
  appId: "1:470309241646:web:fcaa8149a38972c7db30bf"
};

export const app = initializeApp(firebaseConfig)
export const  storage = getStorage(app);