import { Link, Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center gap-6">
        <Link to="/" className="font-bold text-lg">AranguStock</Link>
        <div className="flex gap-4">
          <Link to="/products">Productos</Link>
        </div>
        <div className="ml-auto">
          <Link to="/login">Iniciar Sesión</Link>
        </div>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
