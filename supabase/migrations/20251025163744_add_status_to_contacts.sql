/*
  # Ajout de la colonne status à la table contacts

  ## Modifications
  
  ### Table `contacts`
    - Ajout de `status` (text) - Statut du message (nouveau, traité)
    - Par défaut: 'nouveau'

  ## Notes
    - Cette colonne permet aux admins de marquer les messages comme traités
    - Les messages existants seront marqués comme 'nouveau'
*/

-- Ajouter la colonne status si elle n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'status'
  ) THEN
    ALTER TABLE contacts ADD COLUMN status text DEFAULT 'nouveau';
  END IF;
END $$;