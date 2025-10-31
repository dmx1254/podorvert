/*
  # Fix Plant Requests Permissions

  This migration grants the necessary permissions to allow anonymous users
  to insert data into the plant_requests table.

  ## Changes
  1. Grant USAGE on schema public to anon and authenticated roles
  2. Grant INSERT permission on plant_requests to anon and authenticated
  3. Grant SELECT, UPDATE, DELETE to authenticated (admins)

  ## Security
  - RLS policies remain in place for additional security
  - Anonymous users can only INSERT
  - Authenticated users have full access
*/

-- Grant schema usage
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant table permissions
GRANT INSERT ON plant_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON plant_requests TO authenticated;

-- Grant sequence usage for the id column (if using serial/sequence)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
