import { IProductInWarehouseMinified } from "./product-in-warehouse-minified"

export interface IProductRemainsMinified {
  productId: string
  remains: IProductInWarehouseMinified[]
}
