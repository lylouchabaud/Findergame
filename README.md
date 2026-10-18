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

Un déploiement Vercel public est automatiquement accessible aux robots de Google, mais l'indexation n'est ni immédiate ni garantie (souvent plusieurs jours à quelques semaines pour un nouveau site). Apparaître en première page est encore un autre sujet (référencement), qui prend en général bien plus de temps.

Étapes à faire toi-même (nécessitent ton compte Google) :

1. Va sur [Google Search Console](https://search.google.com/search-console), ajoute ta propriété avec l'URL exacte de ton site Vercel.
2. Vérifie la propriété (méthode "balise HTML" la plus simple avec ce type de site).
3. Une fois vérifié, utilise l'outil **Inspection d'URL**, colle l'URL de ton site, puis clique sur **Demander une indexation**.
4. Dans **Sitemaps**, soumets `sitemap.xml` (déjà inclus dans ce projet, servi automatiquement à la racine).
5. Patiente — revérifie dans Search Console au bout d'une semaine environ.

Point technique à connaître : ce site est une application React qui génère son contenu côté navigateur (pas de HTML pré-rendu par un serveur). Google arrive à l'indexer, mais moins vite et moins bien qu'un site avec du HTML déjà présent au chargement. Si le référencement est important pour toi à terme, la vraie solution est de migrer vers un framework avec rendu serveur (Next.js par exemple) — un chantier à part, à envisager plus tard si besoin.

## Notes

- Les favoris, le thème, la langue et le profil goûts sont sauvegardés dans le `localStorage` du navigateur (propre à chaque appareil, pas de compte requis).
- Les prix, notes et descriptions des jeux sont indicatifs et saisis manuellement — à vérifier avant achat.
