/*
  # Temporarily disable RLS for plant_requests to test

  1. Changes
    - Disable Row Level Security on plant_requests table
    - This is a temporary measure to identify if RLS is the root cause

  2. Notes
    - This makes the table fully public for INSERT operations
    - We will re-enable RLS with correct policies once confirmed
*/

-- Disable RLS temporarily
ALTER TABLE plant_requests DISABLE ROW LEVEL SECURITY;
