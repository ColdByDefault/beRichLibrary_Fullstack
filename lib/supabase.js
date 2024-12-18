import { createClient } from "@supabase/supabase-js";

// TEMPORARY HARDCODING FOR DEBUGGING
const supabaseUrl = "https://nzfmutahntihnsgymhco.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56Zm11dGFobnRpaG5zZ3ltaGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NDk2NjksImV4cCI6MjA1MDEyNTY2OX0.gXdl2RbfBrHLbnAxzioA3lqTbOxQd0b_jE6RvEAg2Qk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
