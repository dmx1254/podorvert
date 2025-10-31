import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  partner_type?: string;
  message?: string;
  created_at: string;
}

export interface Newsletter {
  id: string;
  email: string;
  created_at: string;
}

export interface MemberCard {
  id: string;
  full_name: string;
  function?: string;
  phone: string;
  village?: string;
  photo_url?: string;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status?: string;
  created_at: string;
}

export interface SponsorMessage {
  id: string;
  name: string;
  email: string;
  locality?: string;
  trees_count?: number;
  amount?: number;
  message?: string;
  status?: string;
  created_at: string;
}

export interface QuizResponse {
  id: string;
  question: string;
  answer: string;
  is_correct: boolean;
  user_email?: string;
  created_at: string;
}

export interface TopSchool {
  id: string;
  school_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  city?: string;
  message?: string;
  created_at: string;
}
