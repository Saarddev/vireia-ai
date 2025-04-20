
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://twxtzrxprmlnpywwwfvw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3eHR6cnhwcm1sbnB5d3d3ZnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNTkzNjMsImV4cCI6MjA2MDczNTM2M30.VzrgnZ0WoX0hxT1nzdEDqKchaJceop7sTa81bRc0qEw";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

