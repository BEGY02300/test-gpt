import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

// Config fournie pour que le site fonctionne tout de suite.
// Pense à régénérer/faire tourner la clé si elle a déjà circulé publiquement.
const firebaseConfig = {
  apiKey: "AIzaSyBTYks3qLdV-GeaLivmE8aP7QbMtbl4Z5M",
  authDomain: "authentication-pour-le-site.firebaseapp.com",
  databaseURL: "https://authentication-pour-le-site-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "authentication-pour-le-site",
  storageBucket: "authentication-pour-le-site.firebasestorage.app",
  messagingSenderId: "815553918707",
  appId: "1:815553918707:web:819bae9f05960a70f4a986",
  measurementId: "G-WQMLCYSCK5",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

isSupported().then((ok) => {
  if (ok) {
    getAnalytics(app);
  }
});
