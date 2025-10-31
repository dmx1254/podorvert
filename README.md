# Podor Vert - Site Web Officiel

Site web de l'association Podor Vert pour la protection de l'environnement et le reboisement dans le département de Podor, Sénégal.

## 🚀 Installation locale

1. Clonez le dépôt:
```bash
git clone <votre-repo-url>
cd podor-vert
```

2. Installez les dépendances:
```bash
npm install
```

3. Configurez les variables d'environnement:
```bash
cp .env.example .env
```

Puis modifiez le fichier `.env` avec vos identifiants Supabase:
```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anonyme_supabase
```

4. Lancez le serveur de développement:
```bash
npm run dev
```

5. Ouvrez votre navigateur à l'adresse: `http://localhost:5173`

## 📦 Build de production

```bash
npm run build
```

Les fichiers seront générés dans le dossier `dist/`.

## 🌐 Déploiement

### Sur Netlify

1. Créez un compte sur [Netlify](https://www.netlify.com/)
2. Connectez votre dépôt GitHub
3. Configurez les variables d'environnement dans les paramètres:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Build command: `npm run build`
5. Publish directory: `dist`

### Sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com/)
2. Importez votre projet depuis GitHub
3. Ajoutez les variables d'environnement:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Déployez!

### Variables d'environnement requises

⚠️ **IMPORTANT**: Le site ne fonctionnera pas sans ces variables d'environnement!

Pour obtenir vos identifiants Supabase:
1. Allez sur [supabase.com](https://supabase.com/)
2. Créez un projet (ou utilisez un existant)
3. Dans Settings > API, copiez:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

## 🔑 Configuration de la base de données

Le projet utilise Supabase comme base de données. Les migrations SQL se trouvent dans le dossier `supabase/migrations/`.

Pour configurer la base de données:
1. Créez un projet Supabase
2. Exécutez les migrations dans l'ordre chronologique via le SQL Editor de Supabase

## 👤 Connexion Admin

Pour accéder à l'interface d'administration:
- URL: `/admin/login`
- Email: Configuré dans la base de données
- Mot de passe: Configuré dans la base de données

## 📋 Structure du projet

```
podor-vert/
├── public/           # Fichiers statiques (images, etc.)
├── src/
│   ├── components/   # Composants React réutilisables
│   ├── pages/        # Pages de l'application
│   ├── lib/          # Utilitaires et configurations
│   └── data/         # Données statiques
├── supabase/
│   └── migrations/   # Migrations de base de données
└── dist/             # Build de production (généré)
```

## 🛠️ Technologies utilisées

- **React 19** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Supabase** - Base de données et authentification
- **Framer Motion** - Animations
- **React Router** - Navigation

## 📝 Fonctionnalités

- ✅ Présentation de l'association
- ✅ Formulaire de contact
- ✅ Demande de plants
- ✅ Inscription des écoles
- ✅ Demande de carte membre
- ✅ Newsletter
- ✅ Quiz interactif
- ✅ Galerie photos
- ✅ Interface d'administration
- ✅ Gestion des partenaires et sponsors

## 🐛 Problèmes courants

### Le site ne s'affiche pas après déploiement

**Cause**: Les variables d'environnement ne sont pas configurées.

**Solution**:
1. Vérifiez que vous avez bien ajouté `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans les paramètres de votre plateforme de déploiement
2. Redéployez le site après avoir ajouté les variables

### Erreur "Could not find the table 'public.xxx'"

**Cause**: Les migrations de base de données n'ont pas été exécutées.

**Solution**:
1. Connectez-vous à votre projet Supabase
2. Allez dans SQL Editor
3. Exécutez toutes les migrations du dossier `supabase/migrations/` dans l'ordre

## 📧 Support

Pour toute question ou problème, contactez:
- Email: contact@podor-vert.org
- Site web: https://podorvert.org

## 📄 Licence

© 2025 Podor Vert. Tous droits réservés.
