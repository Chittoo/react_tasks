import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
 apiKey: "AIzaSyAkDAbFM_hBeUZWMAu7I1nFOA64aafxhRs",
  authDomain: "react-todo-app-db901.firebaseapp.com",
  projectId: "react-todo-app-db901",
  storageBucket: "react-todo-app-db901.firebasestorage.app",
  messagingSenderId: "932349530634",
  appId: "1:932349530634:web:b51d3795bf0d55030a05f3"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)