import { IDeliveryInformation } from "../../shared/models/delivery-information"
import { IOrderItem } from "../../shared/models/order-item"
import { OrderStatus } from "../../shared/models/order-status"
import { IRecivingPlace } from "../../shared/models/reciving-place"

export interface IOrderDetails {
  warehouse: IRecivingPlace
  deliveryInformation?: IDeliveryInformation | null
  status: OrderStatus
  creationDate: Date
  productsInOrder: IOrderItem[]
}
