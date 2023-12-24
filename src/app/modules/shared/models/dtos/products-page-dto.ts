import { IProduct } from "../product"

export interface IProductsPageDto {
  foundCount: number
  products: IProduct[]
}
