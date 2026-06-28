import { useState, type FormEvent } from 'react'
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'

function Navbar() {
  const { isAuthenticated, user, role, signOut } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [searchOpen, setSearchOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const term = search.trim()
    navigate(term ? `/?search=${encodeURIComponent(term)}` : '/')
    setSearchOpen(false)
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Link to="/" className="flex-1 flex items-center gap-2" onClick={() => { setSearch(''); setSearchOpen(false) }}>
            <span className="text-xl font-bold text-gray-900">AranguStock</span>
          </Link>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 justify-center">
            <form onSubmit={handleSearch} className="relative w-full max-w-sm">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-2.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2">
            {/* Mobile search icon */}
            {pathname !== '/login' && (
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-500">{user?.email}</span>
                  {role === 'admin' || role === 'employee' ? (
                    <div className="relative">
                      <button
                        onClick={() => setAdminOpen(!adminOpen)}
                        className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Administración
                        <svg className={`w-4 h-4 transition-transform ${adminOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {adminOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setAdminOpen(false)} />
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
                            <Link to="/admin/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setAdminOpen(false)}>
                              Productos
                            </Link>
                            {role === 'admin' && (
                              <>
                                <Link to="/admin/categories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setAdminOpen(false)}>
                                  Categorías
                                </Link>
                                <Link to="/admin/offers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setAdminOpen(false)}>
                                  Ofertas
                                </Link>
                              </>
                            )}
                            <hr className="my-1 border-gray-100" />
                            <button
                              onClick={() => { signOut(); setAdminOpen(false) }}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                            >
                              Cerrar sesión
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => { signOut(); setAdminOpen(false) }}
                      className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  )}
                </>
              ) : (
                <NavLink to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Iniciar Sesión
                </NavLink>
              )}
            </div>

            {/* Mobile user icon */}
            {isAuthenticated ? (
              <div className="relative md:hidden">
                <button
                  onClick={() => setAdminOpen(!adminOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                {adminOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setAdminOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                        {user?.email}
                      </div>
                      {(role === 'admin' || role === 'employee') && (
                        <>
                          <Link to="/admin/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setAdminOpen(false)}>
                            Productos
                          </Link>
                          {role === 'admin' && (
                            <>
                              <Link to="/admin/categories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setAdminOpen(false)}>
                                Categorías
                              </Link>
                              <Link to="/admin/offers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setAdminOpen(false)}>
                                Ofertas
                              </Link>
                            </>
                          )}
                        </>
                      )}
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={() => { signOut(); setAdminOpen(false) }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <NavLink to="/login" className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-2.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
