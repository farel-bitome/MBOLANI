# Expo Chat + Jitsi Prototype

But: prototype mobile pour chat, groupes et appels de groupe (Jitsi via WebView). Gratuit pour tests.

Prérequis:
- Node.js (16+)
- Expo CLI: `npm install -g expo-cli`
- Compte Firebase (crée un projet gratuit)

Installation:
1. Crée un nouveau dossier et place les fichiers fournis.
2. Dans le dossier du projet: `npm install` (ou `yarn`)
3. Dans `firebase.js` remplace la config par celle de ton projet Firebase.
4. Lance: `expo start` puis ouvre sur ton téléphone via Expo Go.

Remarques:
- WebView pour Jitsi fonctionne dans Expo Go pour tester (meet.jit.si).
- Notifications push et intégration CallKit/VoIP ne sont pas inclus (nécessitent builds natifs).
- Firestore Spark (gratuit) suffit pour tests, surveille quotas si tu fais beaucoup d'essais.

Si tu veux, je peux:
- Générer un repo GitHub avec ces fichiers.
- Ajouter authentification par téléphone.
- Ajouter upload d'images.
