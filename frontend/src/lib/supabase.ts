import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseAnonKey } from '../config/env'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const signInWithPassword = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password })

export const signOut = () => supabase.auth.signOut()

export const getSession = () => supabase.auth.getSession()
