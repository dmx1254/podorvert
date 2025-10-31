/*
  # Add status and plants_count to top_schools

  1. Changes
    - Add `status` column to track publication status ('en_attente' or 'publié')
    - Add `plants_count` column to store the number of plants planted by the school
    - Add `rank_position` column to manually order schools in the top list

  2. Security
    - Maintain existing RLS policies
    - These fields will be managed by administrators only
*/

-- Add status column with default 'en_attente'
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'top_schools' AND column_name = 'status'
  ) THEN
    ALTER TABLE top_schools ADD COLUMN status text DEFAULT 'en_attente';
  END IF;
END $$;

-- Add plants_count column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'top_schools' AND column_name = 'plants_count'
  ) THEN
    ALTER TABLE top_schools ADD COLUMN plants_count integer DEFAULT 0;
  END IF;
END $$;

-- Add rank_position column for manual ordering
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'top_schools' AND column_name = 'rank_position'
  ) THEN
    ALTER TABLE top_schools ADD COLUMN rank_position integer;
  END IF;
END $$;
