import axios from 'axios'
import { apiUrl } from '../config/env'

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export default api
