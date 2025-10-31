# 🔐 Accès Administrateur - Podor Vert

## 🌐 URL de connexion

**Page de connexion admin:**
```
https://votre-site.vercel.app/admin/login
```

OU en local:
```
http://localhost:5173/admin/login
```

---

## 👤 Comptes Administrateur

### Compte Principal #1

**Email:** `harounasylla@gmail.com`
**Mot de passe:** `podorvert2025`
**Rôle:** Super Admin
**Nom complet:** Harouna Sylla

### Compte Principal #2

**Email:** `syllaharouna740@gmail.com`
**Mot de passe:** `[Hash bcrypt - à réinitialiser]`
**Rôle:** Super Admin
**Nom complet:** Sylla Harouna

---

## 📋 Instructions de connexion

1. **Accédez à la page de connexion:**
   - En production: `https://votre-site.vercel.app/admin/login`
   - En local: `http://localhost:5173/admin/login`

2. **Entrez vos identifiants:**
   - Email: `harounasylla@gmail.com`
   - Mot de passe: `podorvert2025`

3. **Cliquez sur "Se connecter"**

4. **Vous serez redirigé vers:** `/admin/dashboard`

---

## 🎯 Fonctionnalités du Dashboard Admin

Une fois connecté, vous aurez accès à:

### 📊 Dashboard Principal
- Vue d'ensemble des statistiques
- Graphiques et métriques clés
- Activités récentes

### 📨 Contacts
- Consultation des messages de contact
- Filtrage par statut (nouveau, en cours, traité)
- Répondre aux demandes

### 🌱 Demandes de Plantes
- Gestion des demandes de plants
- Approbation/rejet des demandes
- Suivi des distributions

### 👥 Cartes Membres
- Validation des demandes de carte membre
- Téléchargement des photos
- Génération des cartes

### 🤝 Partenaires
- Gestion des demandes de partenariat
- Validation des partenaires
- Types: Technique, Financier, Logistique

### 💬 Messages Sponsors
- Modération des messages de parrains
- Publication/masquer les messages
- Affichage sur la page d'accueil

### 🏆 Classement des Écoles
- Gestion des inscriptions d'écoles
- Suivi du nombre de plants
- Mise à jour du classement

### 📧 Newsletter
- Liste des abonnés
- Export des emails
- Statistiques d'inscription

### ❓ Réponses Quiz
- Consultation des réponses au quiz
- Analyse des résultats
- Export des données

### 👨‍💼 Gestion des Admins
- Ajouter/supprimer des administrateurs
- Modifier les rôles
- Désactiver les comptes

---

## 🔒 Sécurité

### Important:

1. **NE PARTAGEZ JAMAIS vos identifiants**
2. **Changez le mot de passe après la première connexion**
3. **Déconnectez-vous toujours après utilisation**
4. **N'utilisez pas de Wi-Fi public pour accéder au dashboard**

### Sessions:

- La session est stockée dans `localStorage`
- Elle expire automatiquement après 24 heures
- Vous pouvez vous déconnecter manuellement

---

## 🔧 Réinitialiser le mot de passe

Si vous oubliez votre mot de passe, contactez le support technique ou exécutez cette commande SQL dans Supabase:

```sql
UPDATE admins
SET password_hash = 'votre_nouveau_mot_de_passe'
WHERE email = 'harounasylla@gmail.com';
```

---

## 🚨 En cas de problème

### Erreur "Email ou mot de passe incorrect"

1. Vérifiez que vous utilisez le bon email
2. Vérifiez qu'il n'y a pas d'espace avant/après le mot de passe
3. Assurez-vous que votre compte est actif
4. Vérifiez la console du navigateur (F12) pour plus de détails

### Erreur de connexion à la base de données

1. Vérifiez que les variables d'environnement sont configurées:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. Vérifiez que Supabase est accessible

### Page blanche ou erreur 404

1. Vérifiez l'URL: elle doit être `/admin/login`
2. Videz le cache du navigateur (Ctrl+Shift+R)
3. Vérifiez que le build a été déployé correctement

---

## 📱 Accès Mobile

Le dashboard admin est responsive et fonctionne sur:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

---

## 🎨 Interface

L'interface admin utilise:
- **Design moderne** avec Tailwind CSS
- **Composants réactifs** avec React
- **Navigation intuitive** avec menu latéral
- **Graphiques** avec Recharts
- **Icônes** avec Lucide React

---

## 📞 Support Technique

En cas de problème technique, contactez:
- **Email:** support@podorvert.org
- **Téléphone:** +221 XX XXX XX XX

Fournissez toujours:
1. L'URL de la page où vous rencontrez le problème
2. Le message d'erreur exact
3. Les étapes pour reproduire le problème
4. Des captures d'écran si possible

---

## ⚠️ IMPORTANT - À FAIRE APRÈS LE DÉPLOIEMENT

1. **Tester la connexion** sur Vercel
2. **Changer le mot de passe** par défaut
3. **Configurer un système de hashage sécurisé** (bcrypt) pour les mots de passe
4. **Supprimer ce fichier** du repository Git pour la sécurité

---

**Dernière mise à jour:** 30 octobre 2025
**Version:** 1.0
**Status:** ✅ Prêt pour le déploiement

---

## 🔐 SÉCURITÉ CRITIQUE

⚠️ **CE FICHIER CONTIENT DES INFORMATIONS SENSIBLES**

**À FAIRE IMMÉDIATEMENT:**

1. **Ajoutez ce fichier au .gitignore:**
   ```bash
   echo "ACCES-ADMIN.md" >> .gitignore
   ```

2. **Supprimez-le de Git si déjà commité:**
   ```bash
   git rm --cached ACCES-ADMIN.md
   git commit -m "Remove sensitive admin credentials file"
   ```

3. **Sauvegardez ce fichier dans un endroit sécurisé:**
   - Gestionnaire de mots de passe (LastPass, 1Password, etc.)
   - Fichier chiffré sur votre ordinateur
   - Coffre-fort numérique

4. **NE LE PARTAGEZ PAS SUR GitHub, Discord, email non chiffré, etc.**
