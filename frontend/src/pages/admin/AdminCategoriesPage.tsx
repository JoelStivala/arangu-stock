import { useEffect, useState } from 'react'
import { getAll, create, update, remove } from '../../services/categoryService'
import type { Category } from '../../types/Category'

function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Category | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({ name: '', description: '' })

  const load = () => {
    setLoading(true)
    setError(null)
    getAll()
      .then(setCategories)
      .catch((err) => setError(err instanceof Error ? err.message : 'Error al cargar'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const resetForm = () => {
    setForm({ name: '', description: '' })
    setEditing(null)
    setCreating(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    if (editing) {
      await update(editing.id, form)
    } else {
      await create(form)
    }
    resetForm()
    load()
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar esta categoría?')) return
    await remove(id)
    load()
  }

  const startEdit = (cat: Category) => {
    setForm({ name: cat.name, description: cat.description ?? '' })
    setEditing(cat)
    setCreating(false)
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
        <button
          onClick={() => { resetForm(); setCreating(true) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Nueva categoría
        </button>
      </div>

      {(creating || editing) && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 bg-white border border-gray-200 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">{editing ? 'Editar categoría' : 'Nueva categoría'}</h2>
          <div className="flex flex-col gap-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                {editing ? 'Actualizar' : 'Crear'}
              </button>
              <button type="button" onClick={resetForm} className="text-sm text-gray-500 hover:text-gray-700">
                Cancelar
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm font-medium text-gray-500">
              <th className="p-4">Nombre</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Creado</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t border-gray-100 hover:bg-gray-50 text-sm">
                <td className="p-4 font-medium text-gray-900">{cat.name}</td>
                <td className="p-4 text-gray-500">{cat.description || '—'}</td>
                <td className="p-4 text-gray-500">{new Date(cat.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(cat)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Eliminar
                    </button>
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

export default AdminCategoriesPage
