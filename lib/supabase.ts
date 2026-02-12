
import { createClient } from '@supabase/supabase-js';

// Live Supabase project credentials
const supabaseUrl = 'https://sjswraurycvdnwsqghmn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqc3dyYXVyeWN2ZG53c3FnaG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NTc4MzcsImV4cCI6MjA4NjQzMzgzN30.5Chaf0CIP8G0G-riv10rF4wo4R6wC6Oya7HFD_U_rgA';

// Check if we are still using placeholders (for safety)
// Fixed: Cast to string to avoid TypeScript error about comparing non-overlapping string literals
export const isSupabaseConfigured = (supabaseUrl as string) !== 'https://your-project.supabase.co';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
