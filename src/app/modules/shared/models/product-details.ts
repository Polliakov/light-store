import { UnitOfMeasure } from "./unit-of-measure"

export interface IProductDetails {
  categoryId: string
  title: string
  price: number
  description?: string
  unitOfMeasure: UnitOfMeasure
  weight?: number
  size?: string
  availabilityCount: number

  imageUri: string
}
