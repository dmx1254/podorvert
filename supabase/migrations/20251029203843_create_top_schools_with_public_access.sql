/*
  # Create Top Schools Table with Public Access

  1. New Table: `top_schools`
    - `id` (uuid, primary key) - Unique identifier
    - `school_name` (text, required) - Name of the school
    - `contact_name` (text, required) - Contact person name
    - `email` (text, required) - Contact email
    - `phone` (text) - Contact phone number
    - `city` (text) - City location
    - `message` (text) - Optional message
    - `status` (text, default 'en_attente') - Publication status ('en_attente' or 'publié')
    - `plants_count` (integer, default 0) - Number of plants planted by the school
    - `rank_position` (integer) - Manual ranking position (null = auto-sort by plants_count)
    - `created_at` (timestamptz) - Registration timestamp

  2. Security
    - RLS enabled on table
    - Anonymous users can INSERT new school registrations
    - Anonymous users can SELECT published schools (status='publié')
    - Authenticated admins can SELECT all schools
    - Authenticated admins can UPDATE school data
    - Realtime enabled for instant updates on public page

  3. Important Notes
    - The public "Top Écoles" page will automatically refresh when schools are published
    - Schools are sorted by rank_position (if set) then by plants_count (descending)
    - Only published schools appear on the public page
*/

-- Create top_schools table
CREATE TABLE IF NOT EXISTS top_schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text,
  message text,
  status text DEFAULT 'en_attente',
  plants_count integer DEFAULT 0,
  rank_position integer,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE top_schools ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to register schools
CREATE POLICY "Anyone can register a school"
  ON top_schools FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anonymous users to view published schools
CREATE POLICY "Anyone can view published schools"
  ON top_schools FOR SELECT
  TO anon, authenticated
  USING (status = 'publié');

-- Allow admins to view all schools
CREATE POLICY "Admins can view all schools"
  ON top_schools FOR SELECT
  TO authenticated
  USING (true);

-- Allow admins to update schools
CREATE POLICY "Admins can update schools"
  ON top_schools FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow admins to delete schools
CREATE POLICY "Admins can delete schools"
  ON top_schools FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_top_schools_created_at ON top_schools(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_top_schools_status ON top_schools(status);
CREATE INDEX IF NOT EXISTS idx_top_schools_plants_count ON top_schools(plants_count DESC);

-- Enable realtime for instant updates
ALTER PUBLICATION supabase_realtime ADD TABLE top_schools;
