import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://rwmikspgfduaaduwxpiv.supabase.co';
const supabaseKey = 'Supabase_API_Key';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
