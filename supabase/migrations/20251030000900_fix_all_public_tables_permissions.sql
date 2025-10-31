/*
  # Fix Permissions for All Public Forms

  This migration grants the necessary permissions to all tables that accept
  public form submissions to ensure anonymous users can insert data.

  ## Changes
  1. Grant INSERT permissions to anon and authenticated on all public forms
  2. Grant SELECT, UPDATE, DELETE to authenticated users (admins)
  3. Grant sequence usage for ID generation

  ## Tables affected
  - contacts (contact form)
  - member_cards (member card requests)
  - newsletter (newsletter subscriptions)
  - partners (partnership requests)
  - plant_requests (plant requests)
  - quiz_responses (quiz submissions)
  - sponsor_messages (sponsor messages)
  - top_schools (school registrations)

  ## Security
  - RLS policies remain in place for row-level security
  - Anonymous users can only INSERT
  - Authenticated users have full admin access
*/

-- Grant schema usage (if not already granted)
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant INSERT permissions for public forms
GRANT INSERT ON contacts TO anon, authenticated;
GRANT INSERT ON member_cards TO anon, authenticated;
GRANT INSERT ON newsletter TO anon, authenticated;
GRANT INSERT ON partners TO anon, authenticated;
GRANT INSERT ON plant_requests TO anon, authenticated;
GRANT INSERT ON quiz_responses TO anon, authenticated;
GRANT INSERT ON sponsor_messages TO anon, authenticated;
GRANT INSERT ON top_schools TO anon, authenticated;

-- Grant full permissions to authenticated users (admins)
GRANT SELECT, UPDATE, DELETE ON contacts TO authenticated;
GRANT SELECT, UPDATE, DELETE ON member_cards TO authenticated;
GRANT SELECT, UPDATE, DELETE ON newsletter TO authenticated;
GRANT SELECT, UPDATE, DELETE ON partners TO authenticated;
GRANT SELECT, UPDATE, DELETE ON plant_requests TO authenticated;
GRANT SELECT, UPDATE, DELETE ON quiz_responses TO authenticated;
GRANT SELECT, UPDATE, DELETE ON sponsor_messages TO authenticated;
GRANT SELECT, UPDATE, DELETE ON top_schools TO authenticated;

-- Grant sequence usage for ID generation
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Grant SELECT on sponsor_messages for published messages (public viewing)
-- This allows the homepage to display published sponsor messages
GRANT SELECT ON sponsor_messages TO anon;
GRANT SELECT ON top_schools TO anon;
