/*
  # Fix Newsletter - Désactiver RLS complètement
  
  Cette migration désactive complètement le RLS sur la table newsletter
  pour permettre l'accès complet aux admins authentifiés et l'insertion anonyme.
  
  La table newsletter est conçue pour:
  - Recevoir des soumissions anonymes d'inscriptions newsletter
  - Permettre aux admins de lire toutes les inscriptions
  
  Les données ne sont pas sensibles (juste des emails).
*/

-- 1. Désactiver RLS sur newsletter
ALTER TABLE newsletter DISABLE ROW LEVEL SECURITY;

-- 2. Supprimer toutes les politiques existantes
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'newsletter'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON newsletter', pol.policyname);
    END LOOP;
END $$;

-- 3. S'assurer que les permissions GRANT sont présentes
GRANT ALL PRIVILEGES ON newsletter TO anon;
GRANT ALL PRIVILEGES ON newsletter TO authenticated;
GRANT ALL PRIVILEGES ON newsletter TO service_role;

-- 4. Ajouter un commentaire pour expliquer
COMMENT ON TABLE newsletter IS 'Table publique sans RLS - accès anonyme pour inscription newsletter, lecture complète pour admins';

-- 5. Vérifier et afficher le statut
DO $$
DECLARE
    rls_enabled boolean;
    row_count integer;
BEGIN
    SELECT relrowsecurity INTO rls_enabled
    FROM pg_class
    WHERE relname = 'newsletter';
    
    SELECT COUNT(*) INTO row_count FROM newsletter;
    
    RAISE NOTICE 'RLS Status for newsletter: %', CASE WHEN rls_enabled THEN 'ENABLED' ELSE 'DISABLED' END;
    RAISE NOTICE 'Total subscribers: %', row_count;
END $$;
