import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-analytics.js";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

const firebaseConfig = window.TOOLHUB_FIREBASE_CONFIG;

export const isFirebaseConfigured = Boolean(firebaseConfig?.apiKey && firebaseConfig?.projectId);
export const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;

export const providers = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
  yahoo: new OAuthProvider("yahoo.com"),
  apple: new OAuthProvider("apple.com"),
};

if (app) {
  isSupported().then((ok) => {
    if (ok) getAnalytics(app);
  });
}
