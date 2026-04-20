# Web Radio du Collège

Site web pour écouter les podcasts de la web radio avec authentification Firebase.

## Ce qui est en place

- Interface plus moderne et mobile-friendly
- Section d'accroche éditable via dossier `accroche/`
- Connexion Firebase: anonyme, Google, email/mot de passe
- Playlists chargées depuis `playlists/manifest.json`
- Prêt pour publication GitHub Pages

## 1) Modifier l'accroche (headline)

Édite le fichier `accroche/accroche.json`:

```json
{
  "title": "Ton titre",
  "subtitle": "Ton sous-titre",
  "ctaLabel": "Texte du bouton",
  "ctaHref": "#playlists"
}
```

## 2) Gérer les playlists via GitHub

Le site lit `playlists/manifest.json`.

Exemple:

```json
[
  {
    "name": "Matinale",
    "tracks": [
      { "title": "Épisode 1", "file": "playlists/matinale/episode-1.mp3" }
    ]
  }
]
```

## 3) Firebase

La config est dans `js/firebase-init.js` avec les valeurs fournies, pour démarrer directement.

⚠️ Important sécurité: si la clé/API a été exposée publiquement, fais une rotation dans Firebase Console et remplace les valeurs.

## 4) Publication GitHub Pages

1. Push le dépôt sur GitHub.
2. Ouvre `Settings > Pages`.
3. `Deploy from a branch`.
4. Branche: `main` (ou ta branche), dossier `/ (root)`.
5. Sauvegarde et attends l'URL publique.
