import { IDeliveryInformation } from "../../shared/models/delivery-information"
import { OrderStatus } from "../../shared/models/order-status"
import { IWarehouseMinified } from "../../shared/models/warehouse-minified"

export interface IOrder {
  id: string
  warehouse: IWarehouseMinified
  deliveryInformation?: IDeliveryInformation | null
  status: OrderStatus
  creationDate: Date
}
