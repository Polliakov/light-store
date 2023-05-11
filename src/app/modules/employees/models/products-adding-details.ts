import { IWarehouseMinified } from "../../shared/models/warehouse-minified"
import { IEmployee } from "./employee"
import { IProductInAdding } from "./product-in-adding"

export interface IProductsAddingDetails {
  employee: IEmployee
  warehouse: IWarehouseMinified
  creationDate: Date
  productsInAdding: IProductInAdding[]
}
