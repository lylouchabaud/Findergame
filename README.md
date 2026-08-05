# Trouve ton prochain jeu — Catalogue multi-plateformes

Application de recherche de jeux vidéo (PS5, PS4, Xbox, PC, Nintendo Switch) : filtres par genre, note, prix, mode de jeu et plateforme, 6 thèmes visuels, 5 langues, profil goûts personnalisé et favoris.

Tous les fichiers sont volontairement à la racine (pas de sous-dossier `src/`) pour éviter les soucis d'upload sur GitHub via le navigateur.

## Développement local

```bash
npm install
npm run dev
```

Ouvre ensuite l'adresse affichée dans le terminal (en général http://localhost:5173).

## Build de production

```bash
npm run build
npm run preview
```

## Déploiement sur Vercel

1. Pousse ce dossier sur un dépôt GitHub (voir plus bas).
2. Va sur [vercel.com](https://vercel.com), connecte-toi avec GitHub.
3. Clique sur **Add New → Project**, choisis ce dépôt.
4. Vercel détecte automatiquement Vite — laisse les réglages par défaut (`npm run build`, dossier de sortie `dist`).
5. Clique sur **Deploy**. Ton site sera en ligne en une à deux minutes, avec une URL du type `ton-projet.vercel.app`.

Tu pourras ensuite relier un nom de domaine personnalisé depuis les réglages du projet Vercel.

## Mettre le dépôt sur GitHub

```bash
git init
git add .
git commit -m "Premier commit"
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/NOM-DU-DEPOT.git
git push -u origin main
```

(Remplace l'URL par celle de ton propre dépôt, créé au préalable sur github.com.)

## Être indexé par Google

Un déploiement Vercel public est automatiquement accessible aux robots de Google, mais l'indexation n'est ni immédiate ni garantie. Pour l'accélérer :

- Inscris ton site sur [Google Search Console](https://search.google.com/search-console) et soumets ton URL.
- Vérifie que le site n'est pas protégé par mot de passe dans les réglages Vercel.

## Notes

- Les favoris, le thème, la langue et le profil goûts sont sauvegardés dans le `localStorage` du navigateur (propre à chaque appareil, pas de compte requis).
- Les prix, notes et descriptions des jeux sont indicatifs et saisis manuellement — à vérifier avant achat.
