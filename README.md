# Web Radio du Collège

Site vitrine pour écouter les podcasts de la web radio avec authentification Firebase (anonyme, Google, email/mot de passe).

## 1) Sécurité Firebase (très important)

Tu as partagé une clé API dans ton message. **Fais une rotation de clé dans Firebase** avant de mettre ton site en ligne.

Ensuite:

1. Copie `js/firebase-config.example.js` en `js/firebase-config.js`.
2. Colle tes nouvelles valeurs Firebase dans `js/firebase-config.js`.
3. Vérifie que `js/firebase-config.js` n'est jamais commit (déjà dans `.gitignore`).

⚠️ Sur un site web, la config Firebase est visible côté navigateur. La vraie protection se fait via:
- règles Firebase Auth / Database strictes,
- restrictions de domaine dans Firebase,
- App Check,
- permissions minimales.

## 2) Gestion des playlists via GitHub

Les playlists sont dans `playlists/manifest.json`.

Exemple d'entrée:

```json
{
  "name": "Nom playlist",
  "tracks": [
    { "title": "Titre épisode", "file": "URL_ou_chemin_audio" }
  ]
}
```

Tu peux aussi créer des sous-dossiers dans `playlists/` pour ranger les fichiers audio, puis référencer les chemins dans `manifest.json`.

## 3) Publication GitHub Pages

1. Push ce repo sur GitHub.
2. Va dans **Settings > Pages**.
3. Source: **Deploy from a branch**.
4. Branche: **main** (ou la branche que tu utilises), dossier `/ (root)`.
5. Sauvegarde, puis attends l'URL publique.

## 4) Fournisseurs activés

Le code prend en charge:
- Anonyme
- Google
- Email/mot de passe

Le fournisseur téléphone n'est pas branché dans cette version (possible à ajouter ensuite).
