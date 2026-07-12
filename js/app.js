import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import { auth, isFirebaseConfigured, providers } from "./firebase-init.js";

const tools = [
  ["Calculatrices", "Moyenne scolaire, IMC, carburant, salaire net/brut, unités, scientifique, pourcentage, TVA, dates et âge."],
  ["Développement", "JSON/HTML/CSS beautifier, Base64, UUID, mots de passe, QR Code, SHA256, MD5, couleurs et regex."],
  ["Gaming", "Pseudo, base de données de jeux, quiz, speedrun timer, DPI/sensibilité et compteur FPS."],
  ["École", "Révisions Brevet, quiz maths/français/histoire, fiches, calcul moyenne et planning."],
  ["Aviation", "Articles, guides, cartes, lexique et actualités aéronautiques."],
  ["Informatique", "Tutoriels, actualités, guides Windows/Linux, développement, IA et cybersécurité."],
];

const $ = (selector) => document.querySelector(selector);
const authStatus = $("#auth-status");
const toolGrid = $("#tool-grid");
const quickResults = $("#quick-results");
const searchInput = $("#search-input");
const emailForm = $("#email-form");
const emailInput = $("#email");
const passwordInput = $("#password");

function setStatus(message) {
  authStatus.textContent = message;
}

function renderTools(filter = "") {
  const normalized = filter.trim().toLowerCase();
  const matching = tools.filter(([name, description]) => `${name} ${description}`.toLowerCase().includes(normalized));
  toolGrid.innerHTML = matching.map(([name, description]) => `<article class="tool-card"><small>${name}</small><h3>${name}</h3><p>${description}</p></article>`).join("");
  quickResults.innerHTML = matching.slice(0, 4).map(([name, description]) => `<div class="quick-item"><strong>${name}</strong><br><small>${description}</small></div>`).join("") || `<div class="quick-item">Aucun outil trouvé. Essayez “QR Code”, “IMC” ou “Linux”.</div>`;
}

function suggestUsernames(baseName) {
  const base = baseName.replace(/[^a-zA-Z0-9]/g, "") || "Auguste";
  return [base, `${base}_`, `${base}123`, `The${base}`, `${base}FR`, `${base}_2026`];
}

$("#username-suggestions").innerHTML = suggestUsernames("Auguste").map((name) => `<span>${name}</span>`).join("");
renderTools();

searchInput.addEventListener("input", (event) => renderTools(event.target.value));

$("#theme-toggle").addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("toolhub-theme", next);
});

document.documentElement.dataset.theme = localStorage.getItem("toolhub-theme") || "dark";

if (!isFirebaseConfigured) {
  setStatus("Ajoutez js/firebase-config.js depuis l'exemple pour activer Firebase Auth.");
} else {
  onAuthStateChanged(auth, (user) => {
    setStatus(user ? `Connecté : ${user.email ?? user.uid}` : "Non connecté");
  });
}

document.querySelectorAll("[data-provider]").forEach((button) => {
  button.addEventListener("click", async () => {
    if (!auth) return setStatus("Firebase n'est pas configuré.");
    const providerName = button.dataset.provider;
    if (providerName === "phone") return setStatus("Connexion téléphone : prévoir reCAPTCHA + vérification SMS côté Firebase.");
    if (providerName === "email") return emailInput.focus();
    try {
      await signInWithPopup(auth, providers[providerName]);
    } catch (error) {
      setStatus(`Erreur ${providerName}: ${error.message}`);
    }
  });
});

emailForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!auth) return setStatus("Firebase n'est pas configuré.");
  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  } catch (error) {
    setStatus(`Erreur email: ${error.message}`);
  }
});

$("#btn-register").addEventListener("click", async () => {
  if (!auth) return setStatus("Firebase n'est pas configuré.");
  try {
    await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  } catch (error) {
    setStatus(`Erreur inscription: ${error.message}`);
  }
});

$("#btn-reset").addEventListener("click", async () => {
  if (!auth) return setStatus("Firebase n'est pas configuré.");
  try {
    await sendPasswordResetEmail(auth, emailInput.value);
    setStatus("Email de réinitialisation envoyé si le compte existe.");
  } catch (error) {
    setStatus(`Erreur réinitialisation: ${error.message}`);
  }
});

$("#btn-logout").addEventListener("click", async () => {
  if (auth) await signOut(auth);
});
