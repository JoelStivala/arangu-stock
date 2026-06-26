export interface Offer {
  id: string
  name: string
  description: string | null
  discountPercentage: number
  active: boolean
  startDate: string | null
  endDate: string | null
  createdAt: string
}
