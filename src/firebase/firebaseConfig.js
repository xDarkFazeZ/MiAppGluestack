// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCEO5bD2yidMRHgG_o9T306gWyE0QXtXR0",
  authDomain: "appsmoviles-9384c.firebaseapp.com",
  databaseURL: "https://appsmoviles-9384c-default-rtdb.firebaseio.com",
  projectId: "appsmoviles-9384c",
  storageBucket: "appsmoviles-9384c.appspot.com",
  messagingSenderId: "1053700047910",
  appId: "1:1053700047910:web:f59db8a3fdb30b8882d2e7"
};

// Inicializar app
const app = initializeApp(firebaseConfig);

// Exportar auth y database
export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;