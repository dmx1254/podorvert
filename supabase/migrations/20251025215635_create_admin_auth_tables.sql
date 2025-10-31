/*
  # Création des tables d'authentification admin

  1. Nouvelles Tables
    - `admins`
      - `id` (uuid, primary key)
      - `email` (text, unique) - Email de l'admin
      - `password_hash` (text) - Mot de passe hashé
      - `full_name` (text) - Nom complet
      - `role` (text) - Rôle (super_admin, admin)
      - `is_active` (boolean) - Statut actif/inactif
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `last_login` (timestamptz) - Dernière connexion

  2. Sécurité
    - Enable RLS sur `admins`
    - Policies restrictives pour accès sécurisé
*/

CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can manage all admins"
  ON admins
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
      AND admins.role = 'super_admin'
      AND admins.is_active = true
    )
  );

CREATE POLICY "Admins can view their own profile"
  ON admins
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update their own profile"
  ON admins
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'admins' 
    AND column_name = 'created_at'
  ) THEN
    ALTER TABLE admins ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;
END $$;

INSERT INTO admins (email, password_hash, full_name, role, is_active) 
VALUES (
  'syllaharouna740@gmail.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye7L2qxWRJxY.gZJZJZJZJZJZJZJZJ0',
  'Sylla Harouna',
  'super_admin',
  true
)
ON CONFLICT (email) DO NOTHING;
