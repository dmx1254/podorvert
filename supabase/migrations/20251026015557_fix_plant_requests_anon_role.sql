/*
  # Fix anonymous role access for plant_requests

  1. Changes
    - Drop the INSERT policy that uses 'public' role
    - Create new INSERT policy explicitly for 'anon' and 'authenticated' roles
    - This ensures anonymous users can submit plant requests

  2. Security
    - Allow both anonymous (anon) and authenticated users to insert
    - Maintain restricted access for read/update/delete operations
*/

-- Drop the existing INSERT policy that uses 'public' role
DROP POLICY IF EXISTS "Allow anonymous and authenticated inserts" ON plant_requests;

-- Create new INSERT policy explicitly for anon and authenticated roles
CREATE POLICY "Allow anon and authenticated to insert"
  ON plant_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
