/*
  # Force Disable RLS on plant_requests - Version 2
  
  Cette migration force la désactivation complète du RLS sur plant_requests
  et s'assure que les permissions sont correctement configurées.
  
  La table plant_requests est une table publique destinée à recevoir
  des soumissions anonymes de demandes de plants.
*/

-- 1. Désactiver RLS (force)
ALTER TABLE IF EXISTS plant_requests DISABLE ROW LEVEL SECURITY;

-- 2. Supprimer TOUTES les politiques existantes
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'plant_requests'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON plant_requests', pol.policyname);
    END LOOP;
END $$;

-- 3. S'assurer que les permissions GRANT sont présentes
GRANT ALL PRIVILEGES ON plant_requests TO anon;
GRANT ALL PRIVILEGES ON plant_requests TO authenticated;
GRANT ALL PRIVILEGES ON plant_requests TO service_role;

-- 4. Vérifier et afficher le statut
DO $$
DECLARE
    rls_enabled boolean;
BEGIN
    SELECT relrowsecurity INTO rls_enabled
    FROM pg_class
    WHERE relname = 'plant_requests';
    
    RAISE NOTICE 'RLS Status for plant_requests: %', CASE WHEN rls_enabled THEN 'ENABLED' ELSE 'DISABLED' END;
END $$;
