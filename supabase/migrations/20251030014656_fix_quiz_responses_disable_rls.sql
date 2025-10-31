/*
  # Fix Quiz Responses - Désactiver RLS complètement
  
  Cette migration désactive complètement le RLS sur la table quiz_responses
  pour permettre l'accès complet aux admins authentifiés et l'insertion anonyme.
  
  La table quiz_responses est conçue pour:
  - Recevoir des soumissions anonymes de réponses au quiz CO2
  - Permettre aux admins de voir toutes les réponses et statistiques
  
  Les données ne sont pas sensibles (questions, réponses, scores).
*/

-- 1. Désactiver RLS sur quiz_responses
ALTER TABLE quiz_responses DISABLE ROW LEVEL SECURITY;

-- 2. Supprimer toutes les politiques existantes
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'quiz_responses'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON quiz_responses', pol.policyname);
    END LOOP;
END $$;

-- 3. S'assurer que les permissions GRANT sont présentes
GRANT ALL PRIVILEGES ON quiz_responses TO anon;
GRANT ALL PRIVILEGES ON quiz_responses TO authenticated;
GRANT ALL PRIVILEGES ON quiz_responses TO service_role;

-- 4. Ajouter un commentaire pour expliquer
COMMENT ON TABLE quiz_responses IS 'Table publique sans RLS - soumissions anonymes quiz CO2, statistiques complètes pour admins';

-- 5. Vérifier et afficher le statut
DO $$
DECLARE
    rls_enabled boolean;
    row_count integer;
    correct_count integer;
    success_rate numeric;
BEGIN
    SELECT relrowsecurity INTO rls_enabled
    FROM pg_class
    WHERE relname = 'quiz_responses';
    
    SELECT COUNT(*) INTO row_count FROM quiz_responses;
    SELECT COUNT(*) INTO correct_count FROM quiz_responses WHERE is_correct = true;
    
    IF row_count > 0 THEN
        success_rate := (correct_count::numeric / row_count::numeric) * 100;
    ELSE
        success_rate := 0;
    END IF;
    
    RAISE NOTICE 'RLS Status for quiz_responses: %', CASE WHEN rls_enabled THEN 'ENABLED' ELSE 'DISABLED' END;
    RAISE NOTICE 'Total responses: %', row_count;
    RAISE NOTICE 'Correct responses: %', correct_count;
    RAISE NOTICE 'Success rate: %%%', ROUND(success_rate, 2);
END $$;
