import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://qpvmlgjcifzhxpejhddh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwdm1sZ2pjaWZ6aHhwZWpoZGRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNTk3MzAsImV4cCI6MjA5NjgzNTczMH0.quFzs2LRabOtx-i2dPJqOTiZYqFk2nmg7vjTM_xNzSU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
