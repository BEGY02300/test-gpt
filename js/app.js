import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import { auth, googleProvider } from "./firebase-init.js";

const authStatus = document.getElementById("auth-status");
const btnAnon = document.getElementById("btn-anon");
const btnGoogle = document.getElementById("btn-google");
const btnRegister = document.getElementById("btn-register");
const btnLogout = document.getElementById("btn-logout");
const emailForm = document.getElementById("email-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const hookTitle = document.getElementById("hook-title");
const hookSubtitle = document.getElementById("hook-subtitle");
const hookLink = document.getElementById("hook-link");

const playlistList = document.getElementById("playlist-list");
const player = document.getElementById("audio-player");
const currentTrack = document.getElementById("current-track");

const showMessage = (message) => {
  authStatus.textContent = message;
};

btnAnon.addEventListener("click", async () => {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    showMessage("Erreur anonyme: " + error.message);
  }
});

btnGoogle.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    showMessage("Erreur Google: " + error.message);
  }
});

emailForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  } catch (error) {
    showMessage("Erreur email/mot de passe: " + error.message);
  }
});

btnRegister.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  } catch (error) {
    showMessage("Erreur création de compte: " + error.message);
  }
});

btnLogout.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    showMessage("Non connecté");
    return;
  }

  const mode = user.isAnonymous ? "anonyme" : "identifié";
  showMessage(`Connecté (${mode}) : ${user.email ?? user.uid}`);
});

async function loadHook() {
  try {
    const response = await fetch("./accroche/accroche.json");
    if (!response.ok) throw new Error("accroche introuvable");
    const data = await response.json();
    hookTitle.textContent = data.title;
    hookSubtitle.textContent = data.subtitle;
    hookLink.textContent = data.ctaLabel;
    hookLink.href = data.ctaHref;
  } catch {
    hookTitle.textContent = "La voix du collège, partout";
    hookSubtitle.textContent = "Retrouve toutes les émissions de la web radio.";
  }
}

async function loadPlaylists() {
  try {
    const response = await fetch("./playlists/manifest.json");
    if (!response.ok) throw new Error("Manifest introuvable");

    const playlists = await response.json();
    playlistList.innerHTML = "";

    playlists.forEach((playlist) => {
      const container = document.createElement("div");
      container.className = "playlist";

      const title = document.createElement("h3");
      title.textContent = playlist.name;
      container.appendChild(title);

      playlist.tracks.forEach((track) => {
        const button = document.createElement("button");
        button.className = "track";
        button.textContent = `▶ ${track.title}`;
        button.addEventListener("click", () => {
          player.src = track.file;
          player.play();
          currentTrack.textContent = `Lecture: ${playlist.name} — ${track.title}`;
        });
        container.appendChild(button);
      });

      playlistList.appendChild(container);
    });
  } catch (error) {
    playlistList.innerHTML = `<p>Impossible de charger les playlists : ${error.message}</p>`;
  }
}

loadHook();
loadPlaylists();
