/*
  # Ajout de la colonne partner_type à la table partners

  ## Modifications
  
  ### Table `partners`
    - Ajout de la colonne `partner_type` (text) - Type de partenaire (Entreprise, Institution, ONG/Association, Autre)
    - Par défaut: 'Entreprise'

  ## Notes
    - Cette colonne permettra de stocker le type de partenaire sélectionné dans le formulaire
    - Les données existantes auront 'Entreprise' comme valeur par défaut
*/

-- Ajouter la colonne partner_type si elle n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'partners' AND column_name = 'partner_type'
  ) THEN
    ALTER TABLE partners ADD COLUMN partner_type text DEFAULT 'Entreprise';
  END IF;
END $$;