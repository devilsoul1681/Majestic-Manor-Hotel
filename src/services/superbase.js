import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rmrtpisltzpdkxlhylmm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcnRwaXNsdHpwZGt4bGh5bG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MTkxNzYsImV4cCI6MjA0MTM5NTE3Nn0.KelWjeOIFp2dK7d330VNIZ9iMR0MQuSKC_mcwFwjfnY";
const supabase = createClient(supabaseUrl, supabaseKey);
export const supabase2 = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: "s1",
  },
});
export default supabase;
