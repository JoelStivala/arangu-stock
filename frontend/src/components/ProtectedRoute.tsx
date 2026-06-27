import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'

interface ProtectedRouteProps {
  allowedRoles?: string[]
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, loading, role } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
