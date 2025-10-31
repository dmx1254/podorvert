/*
  # Création des tables pour l'administration Podor Vert

  ## Nouvelles Tables
  
  ### 1. `partners` - Demandes de partenariat
    - `id` (uuid, clé primaire)
    - `name` (text) - Nom du partenaire
    - `email` (text) - Email de contact
    - `phone` (text) - Numéro de téléphone
    - `company` (text) - Nom de l'entreprise
    - `message` (text) - Message du partenaire
    - `created_at` (timestamp) - Date de soumission

  ### 2. `newsletter` - Abonnements newsletter
    - `id` (uuid, clé primaire)
    - `email` (text) - Email de l'abonné
    - `created_at` (timestamp) - Date d'inscription

  ### 3. `member_cards` - Demandes de carte membre
    - `id` (uuid, clé primaire)
    - `full_name` (text) - Nom complet
    - `email` (text) - Email
    - `phone` (text) - Téléphone
    - `address` (text) - Adresse
    - `created_at` (timestamp) - Date de demande

  ### 4. `contacts` - Messages de contact
    - `id` (uuid, clé primaire)
    - `name` (text) - Nom
    - `email` (text) - Email
    - `subject` (text) - Sujet
    - `message` (text) - Message
    - `created_at` (timestamp) - Date d'envoi

  ### 5. `sponsor_messages` - Messages des parrains
    - `id` (uuid, clé primaire)
    - `name` (text) - Nom du parrain
    - `email` (text) - Email
    - `amount` (numeric) - Montant du parrainage
    - `message` (text) - Message
    - `created_at` (timestamp) - Date d'envoi

  ### 6. `quiz_responses` - Réponses au quiz CO₂
    - `id` (uuid, clé primaire)
    - `question` (text) - Question posée
    - `answer` (text) - Réponse choisie
    - `is_correct` (boolean) - Réponse correcte ou non
    - `user_email` (text) - Email de l'utilisateur (optionnel)
    - `created_at` (timestamp) - Date de réponse

  ### 7. `top_schools` - Inscriptions écoles
    - `id` (uuid, clé primaire)
    - `school_name` (text) - Nom de l'école
    - `contact_name` (text) - Nom du contact
    - `email` (text) - Email
    - `phone` (text) - Téléphone
    - `city` (text) - Ville
    - `message` (text) - Message
    - `created_at` (timestamp) - Date d'inscription

  ## Sécurité
    - RLS activé sur toutes les tables
    - Insertion publique autorisée (pour les formulaires)
    - Lecture restreinte aux utilisateurs authentifiés
*/

-- Table des partenaires
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tout le monde peut insérer des demandes de partenariat"
  ON partners FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Seulement les admins peuvent lire les demandes"
  ON partners FOR SELECT
  TO authenticated
  USING (true);

-- Table de la newsletter
CREATE TABLE IF NOT EXISTS newsletter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tout le monde peut s'inscrire à la newsletter"
  ON newsletter FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Seulement les admins peuvent lire les abonnés"
  ON newsletter FOR SELECT
  TO authenticated
  USING (true);

-- Table des cartes membres
CREATE TABLE IF NOT EXISTS member_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE member_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tout le monde peut demander une carte membre"
  ON member_cards FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Seulement les admins peuvent lire les demandes de carte"
  ON member_cards FOR SELECT
  TO authenticated
  USING (true);

-- Table des contacts
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tout le monde peut envoyer un message de contact"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Seulement les admins peuvent lire les messages"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Table des messages des parrains
CREATE TABLE IF NOT EXISTS sponsor_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  amount numeric DEFAULT 0,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sponsor_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tout le monde peut envoyer un message de parrain"
  ON sponsor_messages FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Seulement les admins peuvent lire les messages de parrains"
  ON sponsor_messages FOR SELECT
  TO authenticated
  USING (true);

-- Table des réponses au quiz
CREATE TABLE IF NOT EXISTS quiz_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  is_correct boolean DEFAULT false,
  user_email text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tout le monde peut répondre au quiz"
  ON quiz_responses FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Seulement les admins peuvent lire les réponses"
  ON quiz_responses FOR SELECT
  TO authenticated
  USING (true);

-- Table des écoles
CREATE TABLE IF NOT EXISTS top_schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE top_schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tout le monde peut inscrire une école"
  ON top_schools FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Seulement les admins peuvent lire les inscriptions"
  ON top_schools FOR SELECT
  TO authenticated
  USING (true);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_partners_created_at ON partners(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);
CREATE INDEX IF NOT EXISTS idx_member_cards_created_at ON member_cards(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sponsor_messages_created_at ON sponsor_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at ON quiz_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_top_schools_created_at ON top_schools(created_at DESC);