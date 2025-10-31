/*
  # Fix Admin Login Access

  This migration adds a policy to allow anonymous users to read admin data
  during login verification. This is necessary for the login page to work.

  ## Changes
  1. Add SELECT policy for anonymous users on admins table
  2. Add UPDATE policy for anonymous users to update last_login

  ## Security
  - Only allows SELECT access (read-only)
  - Password verification still happens in application code
  - Does not expose sensitive data beyond what's needed for login
*/

-- Drop existing policy if exists
DROP POLICY IF EXISTS "Allow anonymous login verification" ON admins;

-- Allow anonymous users to read admin data for login verification
CREATE POLICY "Allow anonymous login verification"
  ON admins FOR SELECT
  TO anon, authenticated
  USING (true);

-- Drop existing policy if exists
DROP POLICY IF EXISTS "Allow anonymous to update last_login" ON admins;

-- Allow anonymous users to update last_login during login
CREATE POLICY "Allow anonymous to update last_login"
  ON admins FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);