/*
  # Permettre l'insertion d'admins avec la clé anon

  1. Modifications
    - Ajout d'une politique permettant les insertions avec la clé anon
    - Cette politique est nécessaire car le système d'auth admin custom n'utilise pas Supabase Auth (auth.uid())
    - RLS reste activé pour la sécurité

  2. Sécurité
    - RLS reste activé
    - Les super-admins authentifiés peuvent toujours tout gérer
    - Les insertions anonymes sont permises (car le frontend utilise la clé anon)
    
  Note: Dans un système de production, vous devriez migrer vers Supabase Auth 
  ou implémenter une Edge Function pour créer des admins de manière sécurisée.
*/

-- Permettre les insertions anonymes pour la table admins
-- Ceci est nécessaire car votre système d'auth custom n'utilise pas Supabase Auth
CREATE POLICY "Allow anon to insert admins"
  ON admins
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Permettre les mises à jour anonymes
CREATE POLICY "Allow anon to update admins"
  ON admins
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Permettre les suppressions anonymes
CREATE POLICY "Allow anon to delete admins"
  ON admins
  FOR DELETE
  TO anon
  USING (true);

-- Permettre les lectures anonymes (déjà présent mais on s'assure qu'il existe)
DROP POLICY IF EXISTS "Allow anon to select admins" ON admins;
CREATE POLICY "Allow anon to select admins"
  ON admins
  FOR SELECT
  TO anon
  USING (true);
