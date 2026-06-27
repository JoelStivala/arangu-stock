import { useNavigate } from 'react-router-dom'
import type { Product } from '../types/Product'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()
  const hasDiscount = product.discountPercentage !== null && product.discountPercentage > 0
  const discountedPrice = hasDiscount
    ? Math.round(product.price * (1 - (product.discountPercentage ?? 0) / 100))
    : null

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 border border-gray-100 overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discountPercentage}% OFF
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1 flex-1">
        {product.categoryName && (
          <span className="text-xs text-gray-400 uppercase tracking-wide">{product.categoryName}</span>
        )}
        <h3 className="font-medium text-sm text-gray-800 line-clamp-2">{product.name}</h3>
        <div className="mt-auto">
          {hasDiscount ? (
            <div className="flex items-baseline gap-2">
              <p className="text-lg font-bold text-gray-900">
                ${discountedPrice?.toLocaleString('es-AR')}
              </p>
              <p className="text-sm text-gray-400 line-through">
                ${Math.round(product.price).toLocaleString('es-AR')}
              </p>
            </div>
          ) : (
            <p className="text-lg font-bold text-gray-900">
              ${Math.round(product.price).toLocaleString('es-AR')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
