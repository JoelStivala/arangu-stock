import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center gap-6">
      <NavLink to="/" className="font-bold text-lg">AranguStock</NavLink>
      <div className="flex gap-4">
        <NavLink to="/products">Productos</NavLink>
      </div>
      <div className="ml-auto">
        <NavLink to="/login">Iniciar Sesión</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
