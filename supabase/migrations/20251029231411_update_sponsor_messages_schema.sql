/*
  # Mise à jour du schéma de la table sponsor_messages

  ## Modifications
  
  ### Table `sponsor_messages`
    - Ajout de `locality` (text) - Localité / Ville du parrain
    - Ajout de `trees_count` (integer) - Nombre d'arbres parrainés
    - Ajout de `status` (text) - Statut de publication ('en_attente', 'publié')
    - Renommage conceptuel de `amount` en option de `trees_count`
    - Par défaut: status = 'en_attente'

  ## Notes
    - Cette migration adapte la table pour les messages des parrains
    - Les anciens messages auront le statut 'en_attente'
    - Le champ trees_count peut être calculé depuis amount ou saisi directement
*/

-- Ajouter les nouvelles colonnes
DO $$
BEGIN
  -- Ajouter la colonne locality
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sponsor_messages' AND column_name = 'locality'
  ) THEN
    ALTER TABLE sponsor_messages ADD COLUMN locality text;
  END IF;

  -- Ajouter la colonne trees_count
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sponsor_messages' AND column_name = 'trees_count'
  ) THEN
    ALTER TABLE sponsor_messages ADD COLUMN trees_count integer DEFAULT 0;
  END IF;

  -- Ajouter la colonne status
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sponsor_messages' AND column_name = 'status'
  ) THEN
    ALTER TABLE sponsor_messages ADD COLUMN status text DEFAULT 'en_attente';
  END IF;
END $$;