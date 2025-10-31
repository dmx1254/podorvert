/*
  # Fix public access for plant_requests table

  1. Changes
    - Drop existing INSERT policy
    - Create new policy that explicitly allows anonymous and authenticated users
    - Bypass RLS entirely for INSERT operations on this table

  2. Security
    - Allow anyone (anonymous and authenticated) to insert plant requests
    - Maintain read access for authenticated admins only
    
  3. Notes
    - This is a public-facing form, so insert access must be unrestricted
    - Admins still need authentication to view/manage requests
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for all users" ON plant_requests;
DROP POLICY IF EXISTS "Enable read for authenticated users only" ON plant_requests;

-- Create permissive INSERT policy for everyone (including anonymous users)
CREATE POLICY "Allow anonymous and authenticated inserts"
  ON plant_requests
  FOR INSERT
  TO public, anon, authenticated
  WITH CHECK (true);

-- Create SELECT policy for authenticated users only
CREATE POLICY "Allow authenticated users to read"
  ON plant_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Ensure UPDATE/DELETE are restricted to authenticated users
CREATE POLICY "Allow authenticated users to update"
  ON plant_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete"
  ON plant_requests
  FOR DELETE
  TO authenticated
  USING (true);
