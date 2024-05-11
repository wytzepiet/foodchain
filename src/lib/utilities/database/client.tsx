import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.SUPABASE_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
if (!supabaseKey || !supabaseUrl) throw new Error("Supabase key and url are required");

export const supabase = createClient(supabaseUrl, supabaseKey);
