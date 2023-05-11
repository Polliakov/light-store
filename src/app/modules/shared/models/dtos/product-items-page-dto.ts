import { IProductItem } from "../product-item"

export interface IProductItemsPageDto {
  foundCount: number
  productItems: IProductItem[]
}
