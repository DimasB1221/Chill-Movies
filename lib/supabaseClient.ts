import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = process.env.VITE_SUPA_URL;
export const supabaseAnonKey = process.env.VITE_SUPA_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL atau Anon Key belum disetting di .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
