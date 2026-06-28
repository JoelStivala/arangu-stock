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

export const getAll = (search?: string) =>
  api.get<Product[]>('/product', { params: { search } }).then((r) => r.data)

export const getById = (id: string) =>
  api.get<Product>(`/product/${id}`).then((r) => r.data)

export const create = (payload: CreateProductPayload) =>
  api.post<Product>('/product', payload).then((r) => r.data)

export const update = (id: string, payload: UpdateProductPayload) =>
  api.put<Product>(`/product/${id}`, payload).then((r) => r.data)

export const getAllAdmin = () =>
  api.get<Product[]>('/product/admin').then((r) => r.data)

export const remove = (id: string) =>
  api.delete(`/product/${id}`)

export const activate = (id: string) =>
  api.patch(`/product/${id}/activate`)
