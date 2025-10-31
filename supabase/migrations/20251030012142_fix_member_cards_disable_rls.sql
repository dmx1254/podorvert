/*
  # Fix Member Cards - Désactiver RLS complètement
  
  Cette migration désactive complètement le RLS sur la table member_cards
  pour permettre l'accès public anonyme sans restriction.
  
  La table member_cards est conçue pour recevoir des soumissions anonymes
  de demandes de cartes de membre. Les données ne sont pas sensibles.
*/

-- 1. Désactiver RLS sur member_cards
ALTER TABLE member_cards DISABLE ROW LEVEL SECURITY;

-- 2. Supprimer toutes les politiques existantes
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'member_cards'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON member_cards', pol.policyname);
    END LOOP;
END $$;

-- 3. S'assurer que les permissions GRANT sont présentes
GRANT ALL PRIVILEGES ON member_cards TO anon;
GRANT ALL PRIVILEGES ON member_cards TO authenticated;
GRANT ALL PRIVILEGES ON member_cards TO service_role;

-- 4. Ajouter un commentaire pour expliquer
COMMENT ON TABLE member_cards IS 'Table publique sans RLS - accès anonyme autorisé pour soumission de demandes de cartes membres';

-- 5. Vérifier et afficher le statut
DO $$
DECLARE
    rls_enabled boolean;
BEGIN
    SELECT relrowsecurity INTO rls_enabled
    FROM pg_class
    WHERE relname = 'member_cards';
    
    RAISE NOTICE 'RLS Status for member_cards: %', CASE WHEN rls_enabled THEN 'ENABLED' ELSE 'DISABLED' END;
END $$;
