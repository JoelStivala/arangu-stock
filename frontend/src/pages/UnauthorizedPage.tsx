import { Link } from 'react-router-dom'

function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <h1 className="text-2xl font-bold text-gray-900">Acceso denegado</h1>
      <p className="text-gray-600">No tienes permisos para acceder a esta sección.</p>
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
        Volver al inicio
      </Link>
    </div>
  )
}

export default UnauthorizedPage
