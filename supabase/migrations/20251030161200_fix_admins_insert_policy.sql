/*
  # Correction des politiques RLS pour la table admins

  1. Modifications
    - Suppression de la politique "Super admins can manage all admins" qui bloque les insertions
    - Ajout de politiques séparées pour SELECT, INSERT, UPDATE et DELETE
    - Permet aux super-admins de créer d'autres admins et super-admins
    - Maintient la sécurité avec RLS activé

  2. Sécurité
    - RLS reste activé
    - Seuls les super-admins actifs peuvent créer/modifier/supprimer des admins
    - Les admins réguliers peuvent uniquement voir et modifier leur propre profil
*/

-- Supprimer l'ancienne politique problématique
DROP POLICY IF EXISTS "Super admins can manage all admins" ON admins;

-- Politique SELECT pour super-admins : voir tous les admins
CREATE POLICY "Super admins can view all admins"
  ON admins
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins AS sa
      WHERE sa.id = auth.uid()
      AND sa.role = 'super_admin'
      AND sa.is_active = true
    )
  );

-- Politique INSERT pour super-admins : créer de nouveaux admins
CREATE POLICY "Super admins can create admins"
  ON admins
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admins AS sa
      WHERE sa.id = auth.uid()
      AND sa.role = 'super_admin'
      AND sa.is_active = true
    )
  );

-- Politique UPDATE pour super-admins : modifier tous les admins
CREATE POLICY "Super admins can update all admins"
  ON admins
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins AS sa
      WHERE sa.id = auth.uid()
      AND sa.role = 'super_admin'
      AND sa.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admins AS sa
      WHERE sa.id = auth.uid()
      AND sa.role = 'super_admin'
      AND sa.is_active = true
    )
  );

-- Politique DELETE pour super-admins : supprimer des admins
CREATE POLICY "Super admins can delete admins"
  ON admins
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins AS sa
      WHERE sa.id = auth.uid()
      AND sa.role = 'super_admin'
      AND sa.is_active = true
    )
  );
