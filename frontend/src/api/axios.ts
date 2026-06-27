import axios from 'axios'
import { apiUrl } from '../config/env'
import { supabase } from '../lib/supabase'

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
})

api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

export default api
