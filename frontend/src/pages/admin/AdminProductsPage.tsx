import { useEffect, useState } from 'react'
import { getAllAdmin, create, update, remove, activate } from '../../services/productService'
import type { Product } from '../../types/Product'
import ProductForm, { type ProductFormData } from '../../components/ProductForm'

function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Product | null>(null)
  const [creating, setCreating] = useState(false)

  const load = () => {
    setLoading(true)
    setError(null)
    getAllAdmin()
      .then(setProducts)
      .catch((err) => setError(err instanceof Error ? err.message : 'Error al cargar'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleCreate = async (data: ProductFormData) => {
    await create({
      name: data.name,
      description: data.description || undefined,
      price: data.price,
      stock: data.stock,
      imageUrl: data.imageUrl || undefined,
      categoryId: data.categoryId,
      offerId: data.offerId || undefined,
    })
    setCreating(false)
    load()
  }

  const handleUpdate = async (data: ProductFormData) => {
    if (!editing) return
    await update(editing.id, {
      name: data.name,
      description: data.description || undefined,
      price: data.price,
      stock: data.stock,
      imageUrl: data.imageUrl || undefined,
      categoryId: data.categoryId,
      offerId: data.offerId || undefined,
      isActive: data.isActive,
    })
    setEditing(null)
    load()
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Desactivar este producto?')) return
    await remove(id)
    load()
  }

  const handleActivate = async (id: string) => {
    await activate(id)
    load()
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
        <button
          onClick={() => setCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Nuevo producto
        </button>
      </div>

      {(creating || editing) && (
        <div className="mb-6 p-6 bg-white border border-gray-200 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">{editing ? 'Editar producto' : 'Nuevo producto'}</h2>
          <ProductForm
            product={editing ?? undefined}
            onSubmit={editing ? handleUpdate : handleCreate}
          />
          <button
            onClick={() => { setCreating(false); setEditing(null) }}
            className="mt-3 text-sm text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm font-medium text-gray-500">
              <th className="p-4">Producto</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50 text-sm">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100" />
                    )}
                    <span className="font-medium text-gray-900">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-700">${Math.round(product.price).toLocaleString('es-AR')}</td>
                <td className="p-4 text-gray-700">{product.stock}</td>
                <td className="p-4 text-gray-500">{product.categoryName}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {product.isActive ? (
                      <>
                        <button
                          onClick={() => { setEditing(product); setCreating(false) }}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Desactivar
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleActivate(product.id)}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Reactivar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminProductsPage
