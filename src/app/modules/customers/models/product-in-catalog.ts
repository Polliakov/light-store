import { IProduct } from "../../shared/models/product"

export interface IProductInCatalog extends IProduct {
  inCart: boolean
}
