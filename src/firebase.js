// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbxllQPz7WhDdmDxyPo2lLNFn-xf8HsRk",
  authDomain: "birth-game-web.firebaseapp.com",
  projectId: "birth-game-web",
  storageBucket: "birth-game-web.firebasestorage.app",
  messagingSenderId: "376942954834",
  appId: "1:376942954834:web:734de51f8e99dad78fd28b",
  measurementId: "G-J8HVQVCBHH"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 匯出資料庫實例，讓其他檔案可以用
export const db = getFirestore(app);
