import { IDeliveryInformation } from "./delivery-information"
import { OrderStatus } from "./order-status"
import { IWarehouseMinified } from "./warehouse-minified"

export interface IOrder {
  id: string
  warehouse: IWarehouseMinified
  deliveryInformation?: IDeliveryInformation | null
  status: OrderStatus
  creationDate: Date
}
