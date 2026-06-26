import api from '../api/axios'
import type { Category } from '../types/Category'

export interface CreateCategoryPayload {
  name: string
  description?: string
}

export interface UpdateCategoryPayload {
  name: string
  description?: string
}

export const getAll = () =>
  api.get<Category[]>('/category').then((r) => r.data)

export const create = (payload: CreateCategoryPayload) =>
  api.post<Category>('/category', payload).then((r) => r.data)

export const update = (id: string, payload: UpdateCategoryPayload) =>
  api.put<Category>(`/category/${id}`, payload).then((r) => r.data)
