import api from '../api/axios'

export interface GenerateDescriptionRequest {
  name: string
  category: string
}

export interface GenerateDescriptionResponse {
  description: string
}

export const generateDescription = (payload: GenerateDescriptionRequest) =>
  api.post<GenerateDescriptionResponse>('/ai/description', payload).then((r) => r.data)
