import { createClient } from "@supabase/supabase-js";

// Pastikan env var ini ada di .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Service Role client (Bypass RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
