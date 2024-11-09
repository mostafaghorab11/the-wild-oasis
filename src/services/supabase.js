import { createClient } from '@supabase/supabase-js';

// console.log(import.meta.env.VITE_SUPABASE_KEY);
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

console.log(supabaseUrl, supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
