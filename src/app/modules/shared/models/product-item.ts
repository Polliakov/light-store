import { UnitOfMeasure } from "./unit-of-measure"

export interface IProductItem {
  id: string
  title: string
  price: number
  unitOfMeasure: UnitOfMeasure
  imageUri: string
}
