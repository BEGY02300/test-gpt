import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { firebaseConfig } from "./firebase-config.js";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

isSupported().then((ok) => {
  if (ok) {
    getAnalytics(app);
  }
});
