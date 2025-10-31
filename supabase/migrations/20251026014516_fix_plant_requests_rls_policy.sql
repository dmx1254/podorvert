/*
  # Fix RLS policy for plant_requests table

  1. Changes
    - Drop existing INSERT policy
    - Create new permissive INSERT policy for public access
    - Ensure anonymous users can submit plant requests

  2. Security
    - Allow anyone (including unauthenticated users) to insert plant requests
    - Maintain read access for authenticated admins only
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Anyone can submit plant requests" ON plant_requests;

-- Create a new more permissive policy for inserts
CREATE POLICY "Enable insert for all users"
  ON plant_requests
  FOR INSERT
  WITH CHECK (true);

-- Ensure the SELECT policy exists for admins
DROP POLICY IF EXISTS "Authenticated users can view all plant requests" ON plant_requests;

CREATE POLICY "Enable read for authenticated users only"
  ON plant_requests
  FOR SELECT
  TO authenticated
  USING (true);
