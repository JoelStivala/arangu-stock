import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg text-gray-600">Página no encontrada</p>
      <Link to="/" className="text-blue-600 hover:underline">Volver al inicio</Link>
    </div>
  )
}

export default NotFoundPage
