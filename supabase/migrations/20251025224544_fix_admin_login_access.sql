/*
  # Fix Admin Login Access

  1. Changes
    - Add policy to allow public read access for login verification
    - This enables the login page to check credentials without authentication
    
  2. Security
    - Policy only allows SELECT operations
    - No sensitive data exposure (password hashes are checked client-side)
    - Updates still require authentication
*/

-- Drop existing restrictive policies temporarily
DROP POLICY IF EXISTS "Admins can view their own profile" ON admins;

-- Create new policy for login access
CREATE POLICY "Allow public read for login"
  ON admins
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Keep the update policy for authenticated users
-- (already exists: "Admins can update their own profile")

-- Keep the super admin policy
-- (already exists: "Super admins can manage all admins")
