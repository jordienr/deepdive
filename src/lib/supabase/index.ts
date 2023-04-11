import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Key");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
export default supabase;
