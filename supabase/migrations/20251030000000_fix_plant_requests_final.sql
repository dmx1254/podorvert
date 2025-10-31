/*
  # Fix Plant Requests RLS Policies - Final Solution

  This migration ensures that the plant_requests table has the correct
  RLS policies to allow anonymous users to submit plant requests.

  ## Changes
  1. Drop all existing policies on plant_requests
  2. Recreate the table structure if needed
  3. Add correct RLS policies for INSERT and SELECT operations

  ## Security
  - Anonymous users (anon) can INSERT new plant requests
  - Authenticated users can SELECT all plant requests
  - RLS is enabled to protect data
*/

-- Ensure the table exists with the correct structure
CREATE TABLE IF NOT EXISTS plant_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name text NOT NULL,
  groupment_type text NOT NULL,
  responsible_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  planned_date date NOT NULL,
  quantity_requested integer NOT NULL,
  plant_species text NOT NULL,
  activity_objective text NOT NULL,
  additional_message text,
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE plant_requests ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to start fresh
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN
        SELECT policyname
        FROM pg_policies
        WHERE tablename = 'plant_requests'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON plant_requests', policy_record.policyname);
    END LOOP;
END $$;

-- Create INSERT policy for anonymous and authenticated users
CREATE POLICY "Allow public plant request submissions"
  ON plant_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create SELECT policy for authenticated users (admins)
CREATE POLICY "Allow authenticated users to view plant requests"
  ON plant_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON plant_requests TO anon, authenticated;
GRANT SELECT ON plant_requests TO authenticated;
GRANT UPDATE, DELETE ON plant_requests TO authenticated;
