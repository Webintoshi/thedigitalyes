import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface SaveTheDate {
    id: string
    slug: string
    partner1: string
    partner2: string
    date: string
    time: string
    venue: string | null
    message: string | null
    created_at: string
    is_paid: boolean
}
