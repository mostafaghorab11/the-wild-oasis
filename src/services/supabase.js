import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://vyqggubtznqxwvaglwzb.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5cWdndWJ0em5xeHd2YWdsd3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNTAxNzcsImV4cCI6MjA0MzcyNjE3N30.MM2PiN55OL0Pj4dmW38JpmhfhlHdAzhuVwLASrIwN0Q';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
