// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://uneiwjpzdsolchihgjaw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuZWl3anB6ZHNvbGNoaWhnamF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NjM4NTAsImV4cCI6MjA2MDEzOTg1MH0.HCbOqWgUUZthZA5bZvTW83ajTQMKRavQjMe156IwB-k";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);