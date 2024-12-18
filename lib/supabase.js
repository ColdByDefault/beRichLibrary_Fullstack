import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || null;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || null;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
