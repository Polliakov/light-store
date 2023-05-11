import { IProductInAddingDto } from "./product-in-adding-dto"

export interface ICreateProductsAddingDto {
  warehouseId: string
  productsInAdding: IProductInAddingDto[]
}
