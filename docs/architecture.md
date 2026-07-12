# Architecture ToolHub

## Stack cible

- Frontend : React, TypeScript, Vite, TailwindCSS, Framer Motion.
- Backend : Firebase Auth, Firestore, Cloud Functions, Firebase Hosting.
- Edge : Cloudflare, CDN, Brotli, cache, WAF et rate limiting.
- Paiement : Stripe Checkout + Billing Portal via Cloud Functions.
- Publicité : Google AdSense, désactivé pour les utilisateurs Premium.

## Collections Firestore

- `Users/{uid}` : état de compte, rôle, premium, providers liés, timestamps.
- `Profiles/{uid}` : avatar, bannière, pseudo unique, bio, site, localisation, réseaux, badges.
- `Settings/{uid}` : thème, préférences, confidentialité, notifications.
- `Favorites/{uid}/items/{toolId}` : favoris d'outils.
- `History/{uid}/items/{eventId}` : historique limité ou illimité Premium.
- `Tools/{toolId}` : manifeste outil, catégorie, tags, statut, permissions.
- `Comments/{commentId}` : commentaires modérés.
- `Reports/{reportId}` : signalements spam/abus.
- `Notifications/{uid}/items/{notificationId}` : notifications utilisateur.
- `Achievements/{uid}/items/{achievementId}` : succès et badges.
- `Stats/{scope}` : métriques agrégées anonymisées.
- `Admin/{document}` : configuration admin serveur uniquement.
- `Logs/{logId}` : journalisation serveur, non lisible côté client.

## Sécurité

- Aucune clé sensible dans le frontend ; les secrets Stripe, GitHub API et webhooks restent dans Cloud Functions.
- CSP stricte, `frame-ancestors 'none'`, validation serveur, reCAPTCHA Enterprise ou App Check.
- Rate limiting par IP, UID et action sensible dans Cloud Functions.
- Vérification email obligatoire pour actions sensibles : changement email, suppression compte, Premium.
- 2FA : utiliser les capacités MFA Firebase lorsque disponibles pour le projet.

## Stockage images

- Pipeline recommandé : upload signé vers Cloud Function, compression, redimensionnement, conversion WebP, contrôle MIME, scan basique et écriture vers Firebase Storage ou GitHub Repository via token serveur.
- Le client ne reçoit jamais de token GitHub ou secret de stockage.

## Plugins d'outils

Chaque outil expose un manifeste :

```ts
export interface ToolPlugin {
  id: string;
  name: string;
  category: string;
  tags: string[];
  premium?: boolean;
  render(container: HTMLElement): void;
}
```

Les plugins doivent être isolés, sans accès aux secrets, compatibles clavier, testables et chargés paresseusement.
