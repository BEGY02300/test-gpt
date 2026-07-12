# ToolHub

ToolHub est une base open source MIT pour une plateforme web premium d'outils gratuits, rapide, responsive et prête à évoluer vers React, TypeScript, Vite, TailwindCSS, Framer Motion, Firebase, Stripe et AdSense.

## Fonctionnalités incluses

- Landing page premium responsive avec dark/light mode, glassmorphism, recherche instantanée et catalogue d'outils.
- Intégration Firebase Authentication sans clé personnelle versionnée : Google, GitHub, Yahoo, Apple et email/mot de passe sont préparés.
- Documentation d'architecture pour Firestore, sécurité, Premium Stripe, AdSense, PWA, Cloudflare et système de plugins.
- Règles Firestore de départ dans `firebase/firestore.rules`.
- CI GitHub Actions avec vérification HTML/CSS/JS légère.

## Démarrage local

```bash
python3 -m http.server 4173
```

Ouvre ensuite `http://localhost:4173`.

## Configuration Firebase

1. Copie `js/firebase-config.example.js` vers `js/firebase-config.js`.
2. Remplis les valeurs publiques Firebase Web App.
3. Active les fournisseurs souhaités dans Firebase Console.
4. Ne versionne jamais `js/firebase-config.js`.

## Feuille de route production

Consulte `docs/architecture.md` pour le modèle Firestore, les fonctions Cloud Functions, la stratégie Stripe/AdSense, la sécurité, le stockage image et l'API interne de plugins.
