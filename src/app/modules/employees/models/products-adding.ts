import { IWarehouseMinified } from "../../shared/models/warehouse-minified"
import { IEmployee } from "./employee"

export interface IProductsAdding {
  id: string
  employee: IEmployee
  warehouse: IWarehouseMinified
  creationDate: Date
}
