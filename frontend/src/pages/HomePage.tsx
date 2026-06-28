import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAll } from '../services/productService'
import type { Product } from '../types/Product'
import ProductCard from '../components/ProductCard'

function HomePage() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') ?? undefined
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getAll(search)
      .then(setProducts)
      .catch((err) => setError(err instanceof Error ? err.message : 'Error al cargar productos'))
      .finally(() => setLoading(false))
  }, [search])

  return (
    <div>
      {/* Hero */}
      <section className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Todo lo que necesitás, al mejor precio
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Explorá nuestro catálogo de productos con los mejores precios y ofertas exclusivas.
            </p>
            <a
              href="#productos"
              className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Ver productos
            </a>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Productos</h2>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-600">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products
              .filter((p) => p.isActive)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg font-medium text-gray-500">No se encontraron productos.</p>
            {search && (
              <p className="text-sm text-gray-400 mt-1">Probá con otro término de búsqueda.</p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
