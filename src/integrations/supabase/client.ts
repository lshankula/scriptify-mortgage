// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cffngmvbjojshjenwcds.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZm5nbXZiam9qc2hqZW53Y2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyNTM0MTcsImV4cCI6MjA1MDgyOTQxN30.X7TaXuX0RffPJxhMCnWlip-vgWHzIwIBpLSCS86H2jw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);