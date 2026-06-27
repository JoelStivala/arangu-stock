import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getById } from '../services/productService'
import type { Product } from '../types/Product'

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const hasDiscount = product !== null && product.discountPercentage !== null && product.discountPercentage > 0
  const discountedPrice = hasDiscount
    ? Math.round((product?.price ?? 0) * (1 - ((product?.discountPercentage ?? 0) / 100)))
    : null
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getById(id)
      .then(setProduct)
      .catch((err) => setError(err instanceof Error ? err.message : 'Producto no encontrado'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-gray-500 text-lg">{error ?? 'Producto no encontrado'}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Volver
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Imagen */}
        <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg bg-gray-50">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Información */}
        <div className="flex flex-col">
          {product.categoryName && (
            <span className="text-xs text-gray-400 uppercase tracking-wide mb-2">
              {product.categoryName}
            </span>
          )}

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {hasDiscount ? (
            <div className="mt-4 flex items-baseline gap-3">
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                ${discountedPrice?.toLocaleString('es-AR')}
              </p>
              <p className="text-xl sm:text-2xl text-gray-400 line-through">
                ${Math.round(product.price).toLocaleString('es-AR')}
              </p>
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {product.discountPercentage}% OFF
              </span>
            </div>
          ) : (
            <p className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
              ${Math.round(product.price).toLocaleString('es-AR')}
            </p>
          )}

          {product.description && (
            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="mt-auto pt-8" />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
