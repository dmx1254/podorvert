# Guide de Déploiement - Podor Vert

## ⚠️ IMPORTANT: Pourquoi le site ne s'affiche pas après déploiement?

Quand vous déployez le site depuis GitHub, le fichier `.env` n'est **PAS inclus** dans le dépôt pour des raisons de sécurité. Sans les variables d'environnement Supabase, le site ne peut pas se connecter à la base de données et reste bloqué sur un écran noir.

## ✅ Solution: Configurer les variables d'environnement

### Étape 1: Récupérer vos identifiants Supabase

1. Allez sur [supabase.com](https://supabase.com/) et connectez-vous
2. Ouvrez votre projet Podor Vert
3. Allez dans **Settings** → **API**
4. Copiez ces deux valeurs:
   - **Project URL** (ressemble à: `https://xxxxx.supabase.co`)
   - **anon/public key** (une longue chaîne de caractères)

### Étape 2: Configurer selon votre plateforme de déploiement

#### 📘 Sur Netlify

1. Allez sur [netlify.com](https://www.netlify.com/) et connectez-vous
2. Sélectionnez votre site Podor Vert
3. Allez dans **Site settings** → **Environment variables**
4. Cliquez sur **Add a variable**
5. Ajoutez ces deux variables:

   **Variable 1:**
   - Key: `VITE_SUPABASE_URL`
   - Value: Votre Project URL Supabase (ex: `https://xxxxx.supabase.co`)

   **Variable 2:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: Votre anon/public key Supabase

6. Cliquez sur **Save**
7. Allez dans **Deploys** → **Trigger deploy** → **Deploy site**
8. Attendez que le déploiement se termine (environ 2-3 minutes)
9. Votre site devrait maintenant fonctionner! 🎉

#### 🔺 Sur Vercel

1. Allez sur [vercel.com](https://vercel.com/) et connectez-vous
2. Sélectionnez votre projet Podor Vert
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez ces deux variables:

   **Variable 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: Votre Project URL Supabase
   - Environment: Production, Preview, Development (cochez les 3)

   **Variable 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: Votre anon/public key Supabase
   - Environment: Production, Preview, Development (cochez les 3)

5. Cliquez sur **Save**
6. Allez dans **Deployments**
7. Cliquez sur les **...** à côté du dernier déploiement
8. Cliquez sur **Redeploy**
9. Attendez la fin du déploiement
10. Votre site devrait maintenant fonctionner! 🎉

#### 🌐 Sur GitHub Pages (pas recommandé pour ce projet)

GitHub Pages ne supporte pas les variables d'environnement côté serveur. Il est recommandé d'utiliser Netlify ou Vercel à la place.

## 🔍 Comment vérifier que ça fonctionne?

Après avoir configuré les variables et redéployé:

1. Ouvrez votre site dans le navigateur
2. Le site devrait s'afficher normalement avec toutes les images et le contenu
3. Testez un formulaire (par exemple, le formulaire de contact)
4. Si le formulaire s'envoie sans erreur, tout fonctionne! ✅

### ✅ Vérification de la page admin

1. **Accédez à la page de connexion admin:**
   ```
   https://votre-site.vercel.app/admin/login
   ```

2. **Testez la connexion:**
   - Email: `harounasylla@gmail.com`
   - Mot de passe: `podorvert2025`
   - Cliquez sur "Se connecter"

3. **Vous devriez être redirigé vers:**
   ```
   https://votre-site.vercel.app/admin/dashboard
   ```

4. **Vérifiez que vous voyez:**
   - Le dashboard avec les statistiques
   - Le menu latéral avec toutes les sections
   - Les graphiques et données
   - Votre nom en haut à droite

5. **Si la connexion fonctionne:** ✅ Tout est opérationnel!

**Note:** Pour plus de détails sur les accès admin, consultez le fichier `ACCES-ADMIN.md` (gardez-le en sécurité et ne le commitez jamais sur Git!)

## ❌ Problèmes courants

### Le site reste noir/vide après avoir ajouté les variables

**Solution:**
1. Vérifiez que vous avez bien **redéployé** le site après avoir ajouté les variables
2. Vérifiez qu'il n'y a pas d'espaces avant ou après les valeurs des variables
3. Videz le cache de votre navigateur (Ctrl + Shift + R)

### Erreur "Could not find the table 'public.xxx'"

**Solution:**
1. Connectez-vous à votre projet Supabase
2. Allez dans **SQL Editor**
3. Exécutez toutes les migrations SQL du dossier `supabase/migrations/` dans l'ordre chronologique

### Les formulaires ne fonctionnent pas

**Solution:**
1. Vérifiez que les tables existent dans Supabase (voir solution précédente)
2. Vérifiez que les politiques RLS sont correctement configurées
3. Ouvrez la console du navigateur (F12) pour voir les erreurs détaillées

## 📋 Checklist de déploiement

- [ ] Compte créé sur Netlify/Vercel
- [ ] Dépôt GitHub connecté
- [ ] Variables d'environnement ajoutées:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Site redéployé après ajout des variables
- [ ] Migrations SQL exécutées dans Supabase
- [ ] Site testé dans le navigateur
- [ ] Formulaire de contact testé
- [ ] Page admin testée (connexion avec harounasylla@gmail.com)

## 🎯 Résultat attendu

Une fois tout configuré correctement, vous devriez avoir:
- ✅ Site web qui s'affiche correctement
- ✅ Toutes les images visibles
- ✅ Formulaires fonctionnels
- ✅ Connexion admin opérationnelle
- ✅ Données enregistrées dans Supabase

## 📞 Besoin d'aide?

Si vous rencontrez toujours des problèmes:
1. Vérifiez les logs de déploiement sur votre plateforme (Netlify/Vercel)
2. Ouvrez la console du navigateur (F12) pour voir les erreurs JavaScript
3. Contactez le support de votre plateforme de déploiement

---

**Note importante:** Les variables d'environnement sont **obligatoires** pour que le site fonctionne. Sans elles, le site ne peut pas se connecter à Supabase et restera inutilisable.
