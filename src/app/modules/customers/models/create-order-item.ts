import { IOrderItem } from "../../shared/models/order-item"
import { IProductInWarehouseMinified } from "../../shared/models/product-in-warehouse-minified"

export interface ICreateOrderItem extends IOrderItem {
  alowedToOrder: boolean
  selected: boolean
  remains: IProductInWarehouseMinified[]
  available: number | null
}
