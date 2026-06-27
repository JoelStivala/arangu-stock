import api from '../api/axios'
import type { Offer } from '../types/Offer'

export interface CreateOfferPayload {
  name: string
  description?: string
  discountPercentage: number
  active?: boolean
  startDate?: string
  endDate?: string
}

export interface UpdateOfferPayload {
  name: string
  description?: string
  discountPercentage: number
  active: boolean
  startDate?: string
  endDate?: string
}

export const getAll = () =>
  api.get<Offer[]>('/offer').then((r) => r.data)

export const create = (payload: CreateOfferPayload) =>
  api.post<Offer>('/offer', payload).then((r) => r.data)

export const update = (id: string, payload: UpdateOfferPayload) =>
  api.put<Offer>(`/offer/${id}`, payload).then((r) => r.data)

export const remove = (id: string) =>
  api.delete(`/offer/${id}`)
