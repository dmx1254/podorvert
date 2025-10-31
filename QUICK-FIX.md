# 🚨 SOLUTION RAPIDE: Site ne s'affiche pas

## Le problème

Votre site est déployé sur GitHub mais reste sur un écran noir avec "Your preview will appear here".

## La cause

❌ Les variables d'environnement Supabase ne sont PAS configurées sur votre plateforme de déploiement (Netlify, Vercel, etc.)

## La solution (5 minutes)

### Option 1: Netlify (Recommandé)

1. **Allez sur Netlify**: https://app.netlify.com
2. **Cliquez sur votre site** "podorvert" ou similaire
3. **Cliquez sur "Site settings"** (en haut)
4. **Dans le menu latéral**: Cliquez sur "Environment variables"
5. **Cliquez sur "Add a variable"**
6. **Ajoutez la première variable**:
   ```
   Key:   VITE_SUPABASE_URL
   Value: https://mjphyjgqvvmpdvhsqzop.supabase.co
   ```
   Cliquez sur "Create variable"

7. **Cliquez à nouveau sur "Add a variable"**
8. **Ajoutez la deuxième variable**:
   ```
   Key:   VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qcGh5amdxdnZtcGR2aHNxem9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3Njg0MDksImV4cCI6MjA3NzM0NDQwOX0.4CY3TaNu5ylt8dZe7yh4PYw7WYZX9rSj85L2qod0l6E
   ```
   Cliquez sur "Create variable"

9. **Redéployez le site**:
   - Cliquez sur "Deploys" (en haut)
   - Cliquez sur "Trigger deploy"
   - Cliquez sur "Deploy site"

10. **Attendez 2-3 minutes** que le déploiement se termine

11. **Rafraîchissez votre site** → ✅ Il devrait maintenant fonctionner!

### Option 2: Vercel

1. **Allez sur Vercel**: https://vercel.com/dashboard
2. **Cliquez sur votre projet**
3. **Cliquez sur "Settings"** (en haut)
4. **Dans le menu latéral**: Cliquez sur "Environment Variables"
5. **Ajoutez la première variable**:
   ```
   Name:  VITE_SUPABASE_URL
   Value: https://mjphyjgqvvmpdvhsqzop.supabase.co
   ```
   Cochez: Production, Preview, Development
   Cliquez sur "Save"

6. **Ajoutez la deuxième variable**:
   ```
   Name:  VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qcGh5amdxdnZtcGR2aHNxem9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3Njg0MDksImV4cCI6MjA3NzM0NDQwOX0.4CY3TaNu5ylt8dZe7yh4PYw7WYZX9rSj85L2qod0l6E
   ```
   Cochez: Production, Preview, Development
   Cliquez sur "Save"

7. **Redéployez**:
   - Allez sur "Deployments"
   - Cliquez sur les "..." à côté du dernier déploiement
   - Cliquez sur "Redeploy"

8. **Attendez 2-3 minutes** que le déploiement se termine

9. **Rafraîchissez votre site** → ✅ Il devrait maintenant fonctionner!

## Comment vérifier que ça marche?

✅ Le site s'affiche avec toutes les images
✅ Vous pouvez naviguer entre les pages
✅ Les formulaires fonctionnent
✅ Pas d'écran noir

## Encore un problème?

### Videz le cache du navigateur
Appuyez sur: **Ctrl + Shift + R** (Windows/Linux) ou **Cmd + Shift + R** (Mac)

### Vérifiez la console
1. Appuyez sur **F12**
2. Allez dans l'onglet "Console"
3. Recherchez des erreurs en rouge

### Les variables sont-elles bien configurées?
Dans Netlify/Vercel, vérifiez que:
- Les noms des variables sont **exactement** comme indiqué (sensible à la casse)
- Il n'y a **pas d'espaces** avant ou après les valeurs
- Vous avez bien **redéployé** après avoir ajouté les variables

## Pourquoi ce problème arrive?

Le fichier `.env` qui contient ces variables **n'est pas poussé sur GitHub** pour des raisons de sécurité. C'est normal! Vous devez les configurer manuellement sur chaque plateforme de déploiement.

## Questions?

Lisez le fichier `DEPLOYMENT.md` pour plus de détails ou contactez le support technique.

---

**Note**: Les valeurs ci-dessus sont les vraies valeurs de votre projet Supabase. Gardez-les confidentielles!
