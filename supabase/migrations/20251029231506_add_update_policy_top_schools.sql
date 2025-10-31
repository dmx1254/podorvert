/*
  # Add UPDATE policy for top_schools

  1. Changes
    - Add UPDATE policy to allow authenticated users (admins) to update top schools
    - This is necessary for the publish/unpublish and edit functionality

  2. Security
    - Only authenticated users can update schools
    - This allows admins to change school status, plants_count, and rank_position
*/

-- Drop policy if it exists first
DROP POLICY IF EXISTS "Authenticated users can update top schools" ON top_schools;

-- Add policy to allow authenticated users to update top schools
CREATE POLICY "Authenticated users can update top schools"
  ON top_schools
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);