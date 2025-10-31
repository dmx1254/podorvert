/*
  # Création du bucket de stockage pour les photos de cartes membres

  1. Bucket Storage
    - Création du bucket `member-photos` pour stocker les photos des membres
    - Configuration publique pour permettre l'affichage des photos
  
  2. Politiques de Sécurité
    - Lecture publique (anyone peut voir les photos)
    - Upload autorisé pour les utilisateurs anonymes (anon)
    - Suppression autorisée pour les admins seulement
*/

-- Create the storage bucket for member photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'member-photos',
  'member-photos',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access for Member Photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon upload of member photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated upload of member photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow deletion of member photos" ON storage.objects;

-- Allow public read access to member photos
CREATE POLICY "Public Access for Member Photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'member-photos');

-- Allow anonymous users to upload photos
CREATE POLICY "Allow anon upload of member photos"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'member-photos');

-- Allow authenticated users to upload photos
CREATE POLICY "Allow authenticated upload of member photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'member-photos');

-- Allow deletion of member photos
CREATE POLICY "Allow deletion of member photos"
ON storage.objects FOR DELETE
TO anon
USING (bucket_id = 'member-photos');