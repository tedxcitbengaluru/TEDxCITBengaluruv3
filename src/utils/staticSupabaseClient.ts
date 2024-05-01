import { createClient } from '@supabase/supabase-js';
import { appConstants } from './appConstants';

export const staticSupabaseClient = createClient(
    appConstants.NEXT_PUBLIC_SUPABASE_URL,
    appConstants.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
