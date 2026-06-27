import { useEffect, useState } from 'react'
import { getAll, create, update, remove } from '../../services/offerService'
import type { Offer } from '../../types/Offer'
import ConfirmModal from '../../components/ConfirmModal'

interface OfferForm {
  name: string
  description: string
  discountPercentage: number
  active: boolean
  startDate: string
  endDate: string
}

const emptyForm: OfferForm = {
  name: '',
  description: '',
  discountPercentage: 0,
  active: true,
  startDate: '',
  endDate: '',
}

function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Offer | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [form, setForm] = useState<OfferForm>(emptyForm)

  const load = () => {
    setLoading(true)
    setError(null)
    getAll()
      .then(setOffers)
      .catch((err) => setError(err instanceof Error ? err.message : 'Error al cargar'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditing(null)
    setCreating(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    if (editing) {
      await update(editing.id, { ...form, active: form.active })
    } else {
      await create({ ...form, active: form.active })
    }
    resetForm()
    load()
  }

  const handleDelete = async (id: string) => {
    await remove(id)
    setDeleting(null)
    load()
  }

  const startEdit = (offer: Offer) => {
    setForm({
      name: offer.name,
      description: offer.description ?? '',
      discountPercentage: offer.discountPercentage,
      active: offer.active,
      startDate: offer.startDate ?? '',
      endDate: offer.endDate ?? '',
    })
    setEditing(offer)
    setCreating(false)
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ofertas</h1>
        <button
          onClick={() => { resetForm(); setCreating(true) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
        >
          + Nueva oferta
        </button>
      </div>

      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
          <div className="absolute inset-0 bg-black/40" onClick={resetForm} />
          <form onSubmit={handleSubmit} className="relative bg-white rounded-xl shadow-xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">{editing ? 'Editar oferta' : 'Nueva oferta'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descuento (%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={form.discountPercentage}
                  onChange={(e) => setForm({ ...form, discountPercentage: Number(e.target.value) })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  Activa
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2 flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                  {editing ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" onClick={resetForm} className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm font-medium text-gray-500">
              <th className="p-4">Nombre</th>
              <th className="p-4">Descuento</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Inicio</th>
              <th className="p-4">Fin</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="border-t border-gray-100 hover:bg-gray-50 text-sm">
                <td className="p-4 font-medium text-gray-900">{offer.name}</td>
                <td className="p-4 text-gray-700">{offer.discountPercentage}%</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${offer.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {offer.active ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{offer.startDate ? new Date(offer.startDate).toLocaleDateString() : '—'}</td>
                <td className="p-4 text-gray-500">{offer.endDate ? new Date(offer.endDate).toLocaleDateString() : '—'}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(offer)} className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer">
                      Editar
                    </button>
                    <button onClick={() => setDeleting(offer.id)} className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        open={deleting !== null}
        title="Eliminar oferta"
        message="¿Estás seguro de que querés eliminar esta oferta?"
        confirmLabel="Eliminar"
        onConfirm={() => { if (deleting) handleDelete(deleting) }}
        onCancel={() => setDeleting(null)}
      />
    </div>
  )
}

export default AdminOffersPage
