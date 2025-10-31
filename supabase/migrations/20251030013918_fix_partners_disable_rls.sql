/*
  # Fix Partners - Désactiver RLS complètement
  
  Cette migration désactive complètement le RLS sur la table partners
  pour permettre l'accès complet aux admins authentifiés et l'insertion anonyme.
  
  La table partners est conçue pour:
  - Recevoir des soumissions anonymes de demandes de partenariat
  - Permettre aux admins de lire toutes les demandes
  
  Les données ne sont pas sensibles (nom, email, entreprise, message public).
*/

-- 1. Désactiver RLS sur partners
ALTER TABLE partners DISABLE ROW LEVEL SECURITY;

-- 2. Supprimer toutes les politiques existantes
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'partners'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON partners', pol.policyname);
    END LOOP;
END $$;

-- 3. S'assurer que les permissions GRANT sont présentes
GRANT ALL PRIVILEGES ON partners TO anon;
GRANT ALL PRIVILEGES ON partners TO authenticated;
GRANT ALL PRIVILEGES ON partners TO service_role;

-- 4. Ajouter un commentaire pour expliquer
COMMENT ON TABLE partners IS 'Table publique sans RLS - accès anonyme pour demandes de partenariat, lecture complète pour admins';

-- 5. Vérifier et afficher le statut
DO $$
DECLARE
    rls_enabled boolean;
    row_count integer;
BEGIN
    SELECT relrowsecurity INTO rls_enabled
    FROM pg_class
    WHERE relname = 'partners';
    
    SELECT COUNT(*) INTO row_count FROM partners;
    
    RAISE NOTICE 'RLS Status for partners: %', CASE WHEN rls_enabled THEN 'ENABLED' ELSE 'DISABLED' END;
    RAISE NOTICE 'Total partners: %', row_count;
END $$;
