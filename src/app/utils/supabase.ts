import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wxjuzsjhnsylinfnbjkj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4anV6c2pobnN5bGluZm5iamtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMzEwODMsImV4cCI6MjA0MzkwNzA4M30.-WR5HOS2cpNX0ag8lVL78znS-_ANSscsEvZkn4jX5MY";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
