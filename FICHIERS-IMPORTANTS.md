# 📁 Fichiers importants pour le déploiement

## ⚠️ À LIRE EN PRIORITÉ

Si votre site ne s'affiche pas après déploiement, lisez **QUICK-FIX.md** en premier!

## 📄 Guides de déploiement

1. **QUICK-FIX.md** ⭐
   - Solution rapide si le site ne s'affiche pas
   - Instructions étape par étape avec les vraies valeurs
   - À lire en PREMIER si vous avez un problème

2. **DEPLOYMENT.md**
   - Guide complet de déploiement
   - Instructions pour Netlify et Vercel
   - Résolution des problèmes courants

3. **README.md**
   - Documentation complète du projet
   - Installation locale
   - Structure du projet

## 🔧 Fichiers de configuration

### Variables d'environnement

- **.env** ❌ NE PAS POUSSER SUR GITHUB
  - Contient vos identifiants Supabase secrets
  - Déjà dans `.gitignore`
  - Ne sera JAMAIS sur GitHub (c'est normal!)

- **.env.example** ✅ À pousser sur GitHub
  - Template pour les variables d'environnement
  - À copier en `.env` pour développement local

### Configuration de déploiement

- **netlify.toml** ✅
  - Configuration pour Netlify
  - Déjà prêt à l'emploi

- **vercel.json** ✅
  - Configuration pour Vercel
  - Déjà prêt à l'emploi

- **.gitignore** ✅
  - Liste des fichiers à ne pas pousser sur GitHub
  - Inclut `.env`, `node_modules`, `dist`, etc.

## 🗄️ Base de données

- **supabase/migrations/** ✅
  - Toutes les migrations SQL
  - À exécuter dans Supabase SQL Editor
  - Ordre chronologique important!

## 📦 Dépendances

- **package.json** ✅
  - Liste toutes les dépendances npm
  - Scripts de build et développement

- **package-lock.json** ✅
  - Versions exactes des dépendances
  - Important pour la reproductibilité

## 🎨 Assets

- **public/** ✅
  - Images, PDFs, fichiers statiques
  - Accessible directement via URL

## 📝 Code source

- **src/** ✅
  - Tout le code React/TypeScript
  - Composants, pages, utilitaires

## ⚙️ Build

- **dist/** ❌ NE PAS POUSSER SUR GITHUB
  - Généré par `npm run build`
  - Sera créé automatiquement lors du déploiement
  - Déjà dans `.gitignore`

## 🚀 Checklist avant de pousser sur GitHub

✅ `.env` est dans `.gitignore`
✅ `.env.example` existe et est à jour
✅ `README.md` est complet
✅ `QUICK-FIX.md` existe
✅ `DEPLOYMENT.md` existe
✅ `netlify.toml` ou `vercel.json` est configuré
✅ Migrations SQL sont dans `supabase/migrations/`
✅ `package.json` et `package-lock.json` sont à jour
✅ Le build fonctionne (`npm run build`)

## 📤 Après avoir poussé sur GitHub

1. Configurer les variables d'environnement sur Netlify/Vercel
2. Lancer le premier déploiement
3. Exécuter les migrations SQL dans Supabase
4. Tester le site en production

## ❓ Questions fréquentes

### Pourquoi le fichier .env n'est pas sur GitHub?

C'est une **bonne pratique de sécurité**. Le fichier `.env` contient des clés d'API sensibles qui ne doivent JAMAIS être publiques. Vous devez configurer ces variables manuellement sur chaque plateforme de déploiement.

### Comment quelqu'un d'autre peut utiliser mon projet?

1. Il clone le dépôt depuis GitHub
2. Il copie `.env.example` en `.env`
3. Il met ses propres identifiants Supabase dans `.env`
4. Il lance `npm install` puis `npm run dev`

### Pourquoi mes images ne s'affichent pas en production?

Vérifiez que:
- Les images sont dans le dossier `public/`
- Les chemins commencent par `/` (ex: `/images/logo.png`)
- Les fichiers sont bien poussés sur GitHub

### Le site fonctionne en local mais pas en production

→ Lisez **QUICK-FIX.md** immédiatement!
→ 99% du temps c'est les variables d'environnement

## 📞 Support

Pour toute question, lisez d'abord:
1. QUICK-FIX.md
2. DEPLOYMENT.md
3. README.md

Si le problème persiste, contactez contact@podor-vert.org

---

**Dernière mise à jour**: Octobre 2025
