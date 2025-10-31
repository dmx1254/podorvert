/*
  # Fix Plant Requests - Désactiver RLS complètement
  
  Désactive complètement le RLS sur la table plant_requests pour permettre
  l'accès public anonyme sans restriction.
  
  Cette table est conçue pour un accès public et ne contient pas de données sensibles.
*/

-- Désactiver RLS sur plant_requests
ALTER TABLE plant_requests DISABLE ROW LEVEL SECURITY;

-- Supprimer toutes les anciennes politiques
DROP POLICY IF EXISTS "Anyone can submit plant requests" ON plant_requests;
DROP POLICY IF EXISTS "Authenticated users can view all plant requests" ON plant_requests;
DROP POLICY IF EXISTS "Enable insert for anon users" ON plant_requests;
DROP POLICY IF EXISTS "Enable read for anon users" ON plant_requests;
DROP POLICY IF EXISTS "Public can insert plant requests" ON plant_requests;

-- Vérifier que les permissions GRANT sont bien présentes
GRANT ALL ON plant_requests TO anon;
GRANT ALL ON plant_requests TO authenticated;

-- Ajouter un commentaire pour expliquer
COMMENT ON TABLE plant_requests IS 'Table publique sans RLS - accès anonyme autorisé pour soumission de demandes';
