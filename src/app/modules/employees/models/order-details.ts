import { IDeliveryInformation } from "../../shared/models/delivery-information"
import { IOrderItem } from "../../shared/models/order-item"
import { OrderStatus } from "../../shared/models/order-status"
import { IRecivingPlace } from "../../shared/models/reciving-place"
import { IRecipient } from "./recipient"

export interface IOrderDetails {
  warehouse: IRecivingPlace
  deliveryInformation?: IDeliveryInformation | null
  customer: IRecipient
  status: OrderStatus
  creationDate: Date
  productsInOrder: IOrderItem[]
}
