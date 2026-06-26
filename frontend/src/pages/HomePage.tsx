import { useEffect, useState } from 'react'
import { getAll } from '../services/productService'
import type { Product } from '../types/Product'

function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAll()
      .then(setProducts)
      .catch((err) => setError(err instanceof Error ? err.message : 'Error al cargar productos'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center h-full text-lg">Cargando...</div>
  if (error) return <div className="flex items-center justify-center h-full text-red-600">{error}</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>
      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{product.categoryName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
