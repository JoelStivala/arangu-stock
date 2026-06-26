export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  imageUrl: string | null
  categoryId: string
  categoryName: string | null
  offerId: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string | null
}
