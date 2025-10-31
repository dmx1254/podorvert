/*
  # Add UPDATE policy for sponsor_messages

  1. Changes
    - Add UPDATE policy to allow authenticated users (admins) to update sponsor messages
    - This is necessary for the publish/unpublish functionality

  2. Security
    - Only authenticated users can update messages
    - This allows admins to change message status
*/

-- Drop policy if it exists first
DROP POLICY IF EXISTS "Authenticated users can update sponsor messages" ON sponsor_messages;

-- Add policy to allow authenticated users to update sponsor messages
CREATE POLICY "Authenticated users can update sponsor messages"
  ON sponsor_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);