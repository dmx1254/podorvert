/*
  # Create plant requests table

  1. New Tables
    - `plant_requests`
      - `id` (uuid, primary key)
      - `organization_name` (text) - Name of the organization/structure
      - `groupment_type` (text) - Type of groupment (association, school, company, NGO, etc.)
      - `responsible_name` (text) - Name of the responsible person
      - `email` (text) - Contact email
      - `phone` (text) - Contact phone number
      - `location` (text) - Location/commune of the project
      - `planned_date` (date) - Planned date for planting
      - `quantity_requested` (integer) - Number of plants requested
      - `plant_species` (text) - Species of trees/plants requested
      - `activity_objective` (text) - Objective of the activity
      - `additional_message` (text, nullable) - Optional additional message
      - `status` (text) - Request status (pending, approved, rejected)
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `plant_requests` table
    - Add policy for public insert access (anyone can submit a request)
    - Add policy for authenticated admins to read all requests
*/

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

ALTER TABLE plant_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit plant requests"
  ON plant_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all plant requests"
  ON plant_requests
  FOR SELECT
  TO authenticated
  USING (true);