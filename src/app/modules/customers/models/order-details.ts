import { IDeliveryInformation } from "../../shared/models/delivery-information"
import { IOrderItem } from "../../shared/models/order-item"
import { OrderStatus } from "../../shared/models/order-status"
import { IWarehouse } from "../../shared/models/warehouse"

export interface IOrderDetails {
  warehouse: IWarehouse
  deliveryInformation?: IDeliveryInformation | null
  status: OrderStatus
  creationDate: Date
  productsInOrder: IOrderItem[]
}
