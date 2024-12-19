// Supabase client initialization
// https://supabase.io/docs/guides/with-nextjs
// null isn't really needed here, but it's a good practice to have a fallback value
// in case the environment variables are not set. whether here or in the .env file or on vercel Environment Variables

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || null;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
