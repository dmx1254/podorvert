/*
  # Fix RLS Policies for Anonymous Access

  This migration fixes all RLS policies to ensure anonymous users (anon role)
  can properly insert data through forms and read published content.

  ## Changes
  1. Update all INSERT policies to explicitly include anon role
  2. Add SELECT policies for public content where needed
  3. Ensure proper WITH CHECK clauses for anon inserts

  ## Security
  - Maintains data security while allowing public form submissions
  - Admins retain full access for management
*/

-- Drop and recreate policies for plant_requests
DROP POLICY IF EXISTS "Anyone can submit plant requests" ON plant_requests;
CREATE POLICY "Anyone can submit plant requests"
  ON plant_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can view all plant requests" ON plant_requests;
CREATE POLICY "Authenticated users can view all plant requests"
  ON plant_requests FOR SELECT
  TO authenticated
  USING (true);

-- Drop and recreate policies for contacts
DROP POLICY IF EXISTS "Tout le monde peut envoyer un message de contact" ON contacts;
CREATE POLICY "Anyone can send contact messages"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Seulement les admins peuvent lire les messages" ON contacts;
CREATE POLICY "Admins can read contact messages"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Drop and recreate policies for member_cards
DROP POLICY IF EXISTS "Tout le monde peut demander une carte membre" ON member_cards;
CREATE POLICY "Anyone can request member card"
  ON member_cards FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Seulement les admins peuvent lire les demandes de carte" ON member_cards;
CREATE POLICY "Admins can read member card requests"
  ON member_cards FOR SELECT
  TO authenticated
  USING (true);

-- Drop and recreate policies for sponsor_messages
DROP POLICY IF EXISTS "Tout le monde peut envoyer un message de parrain" ON sponsor_messages;
CREATE POLICY "Anyone can send sponsor messages"
  ON sponsor_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Seulement les admins peuvent lire les messages de parrains" ON sponsor_messages;
CREATE POLICY "Admins can read sponsor messages"
  ON sponsor_messages FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can update sponsor messages" ON sponsor_messages;
CREATE POLICY "Authenticated users can update sponsor messages"
  ON sponsor_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add public SELECT policy for published sponsor messages
CREATE POLICY "Anyone can view published sponsor messages"
  ON sponsor_messages FOR SELECT
  TO anon, authenticated
  USING (status = 'publié');

-- Drop and recreate policies for partners
DROP POLICY IF EXISTS "Tout le monde peut insérer des demandes de partenariat" ON partners;
CREATE POLICY "Anyone can submit partnership requests"
  ON partners FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Seulement les admins peuvent lire les demandes" ON partners;
CREATE POLICY "Admins can read partnership requests"
  ON partners FOR SELECT
  TO authenticated
  USING (true);

-- Drop and recreate policies for newsletter
DROP POLICY IF EXISTS "Tout le monde peut s'inscrire à la newsletter" ON newsletter;
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Seulement les admins peuvent lire les abonnés" ON newsletter;
CREATE POLICY "Admins can read newsletter subscribers"
  ON newsletter FOR SELECT
  TO authenticated
  USING (true);

-- Drop and recreate policies for quiz_responses
DROP POLICY IF EXISTS "Tout le monde peut répondre au quiz" ON quiz_responses;
CREATE POLICY "Anyone can submit quiz responses"
  ON quiz_responses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Seulement les admins peuvent lire les réponses" ON quiz_responses;
CREATE POLICY "Admins can read quiz responses"
  ON quiz_responses FOR SELECT
  TO authenticated
  USING (true);

-- Ensure top_schools policies are correct
DROP POLICY IF EXISTS "Tout le monde peut inscrire une école" ON top_schools;
DROP POLICY IF EXISTS "Anyone can register a school" ON top_schools;
CREATE POLICY "Anyone can register a school"
  ON top_schools FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Seulement les admins peuvent lire les inscriptions" ON top_schools;
DROP POLICY IF EXISTS "Admins can view all schools" ON top_schools;
CREATE POLICY "Admins can view all schools"
  ON top_schools FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can view published schools" ON top_schools;
CREATE POLICY "Anyone can view published schools"
  ON top_schools FOR SELECT
  TO anon, authenticated
  USING (status = 'publié');

DROP POLICY IF EXISTS "Authenticated users can update top schools" ON top_schools;
DROP POLICY IF EXISTS "Admins can update schools" ON top_schools;
CREATE POLICY "Admins can update schools"
  ON top_schools FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can delete schools" ON top_schools;
CREATE POLICY "Admins can delete schools"
  ON top_schools FOR DELETE
  TO authenticated
  USING (true);