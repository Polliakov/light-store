import { UnitOfMeasure } from "src/app/modules/shared/models/unit-of-measure";

export interface IUpdateProductDto {
  id: string
  categoryId?: string | null
  title: string
  price: number
  weight?: number | null
  size?: string | null
  uniteOfMeasure: UnitOfMeasure
  description?: string | null
}
