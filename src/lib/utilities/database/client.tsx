import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const localUrl = "http://127.0.0.1:54321";
const localKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
if (!supabaseKey || !supabaseUrl) throw new Error("Supabase key and url are required");

// export const supabaseNoTypes = createClient(localUrl, localKey);
export const supabase = createClient<Database>(localUrl, localKey);
