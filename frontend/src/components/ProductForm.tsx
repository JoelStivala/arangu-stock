import { useForm } from 'react-hook-form'
import type { Product } from '../types/Product'
import type { Category } from '../types/Category'
import type { Offer } from '../types/Offer'

export interface ProductFormData {
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string
  categoryId: string
  offerId: string
  isActive: boolean
}

interface ProductFormProps {
  product?: Product
  categories: Category[]
  offers: Offer[]
  onSubmit: (data: ProductFormData) => Promise<void> | void
  onCancel?: () => void
}

function ProductForm({ product, categories, offers, onSubmit, onCancel }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      imageUrl: product?.imageUrl ?? '',
      categoryId: product?.categoryId ?? '',
      offerId: product?.offerId ?? '',
      isActive: product?.isActive ?? true,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          {...register('name', { required: 'El nombre es obligatorio' })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          {...register('description')}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Precio</label>
        <input
          type="number"
          step="0.01"
          {...register('price', {
            required: 'El precio es obligatorio',
            valueAsNumber: true,
            validate: (v) => v > 0 || 'El precio debe ser mayor a 0',
          })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Stock</label>
        <input
          type="number"
          {...register('stock', {
            required: 'El stock es obligatorio',
            valueAsNumber: true,
            validate: (v) => v >= 0 || 'El stock debe ser mayor o igual a 0',
          })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">URL de imagen</label>
        <input
          {...register('imageUrl')}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Categoría</label>
        <select
          {...register('categoryId', { required: 'La categoría es obligatoria' })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {errors.categoryId && <p className="text-red-600 text-sm mt-1">{errors.categoryId.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Oferta</label>
        <select
          {...register('offerId')}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Sin oferta</option>
          {offers.filter((o) => o.active).map((o) => (
            <option key={o.id} value={o.id}>{o.name} ({o.discountPercentage}%)</option>
          ))}
        </select>
      </div>

      {product && (
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('isActive')} id="isActive" />
          <label htmlFor="isActive" className="text-sm font-medium">Activo</label>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? 'Guardando...' : product ? 'Actualizar producto' : 'Crear producto'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default ProductForm
