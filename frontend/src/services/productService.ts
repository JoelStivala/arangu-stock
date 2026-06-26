import api from '../api/axios'
import type { Product } from '../types/Product'

export interface CreateProductPayload {
  name: string
  description?: string
  price: number
  stock: number
  imageUrl?: string
  categoryId: string
  offerId?: string
}

export interface UpdateProductPayload {
  name: string
  description?: string
  price: number
  stock: number
  imageUrl?: string
  categoryId: string
  offerId?: string
  isActive: boolean
}

export const getAll = () =>
  api.get<Product[]>('/api/product').then((r) => r.data)

export const getById = (id: string) =>
  api.get<Product>(`/api/product/${id}`).then((r) => r.data)

export const create = (payload: CreateProductPayload) =>
  api.post<Product>('/api/product', payload).then((r) => r.data)

export const update = (id: string, payload: UpdateProductPayload) =>
  api.put<Product>(`/api/product/${id}`, payload).then((r) => r.data)

export const remove = (id: string) =>
  api.delete(`/api/product/${id}`)
