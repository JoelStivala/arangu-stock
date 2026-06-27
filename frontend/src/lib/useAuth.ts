import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return {
    user: context.user,
    session: context.session,
    loading: context.loading,
    isAuthenticated: !!context.session,
    role: context.role,
    signIn: context.signIn,
    signOut: context.signOut,
  }
}
