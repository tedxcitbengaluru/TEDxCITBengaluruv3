import { z } from 'zod';
import { parseEnv } from './parseEnv';

//env vars need to be explicitly typed to allow bundling
const envObject = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_BUCKET_NAME: process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME
};

export const appConstants = parseEnv(
    z.object({
        NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
        NEXT_PUBLIC_SUPABASE_BUCKET_NAME: z.string()
    }),
    'WEB APP',
    envObject
);
