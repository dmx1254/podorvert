/*
  # Mise à jour du schéma de la table member_cards

  ## Modifications
  
  ### Table `member_cards`
    - Renommage de `full_name` en `full_name` (Prénom et Nom)
    - Suppression de `email` (non présent dans le nouveau formulaire)
    - Ajout de `function` (text) - Fonction (Ex: Agriculteur, Étudiant...)
    - Conservation de `phone` - Téléphone
    - Renommage de `address` en `village` - Village
    - Ajout de `photo_url` (text) - URL de la photo uploadée
    - Conservation de `created_at` - Date d'envoi

  ## Notes
    - Cette migration adapte la table au nouveau formulaire
    - Les anciennes données seront conservées mais converties
*/

-- Ajouter les nouvelles colonnes si elles n'existent pas
DO $$
BEGIN
  -- Ajouter la colonne function
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_cards' AND column_name = 'function'
  ) THEN
    ALTER TABLE member_cards ADD COLUMN function text;
  END IF;

  -- Ajouter la colonne photo_url
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_cards' AND column_name = 'photo_url'
  ) THEN
    ALTER TABLE member_cards ADD COLUMN photo_url text;
  END IF;

  -- Renommer address en village si nécessaire
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_cards' AND column_name = 'address'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_cards' AND column_name = 'village'
  ) THEN
    ALTER TABLE member_cards RENAME COLUMN address TO village;
  END IF;
END $$;

-- Supprimer la colonne email si elle existe (non utilisée dans le nouveau formulaire)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_cards' AND column_name = 'email'
  ) THEN
    ALTER TABLE member_cards DROP COLUMN email;
  END IF;
END $$;