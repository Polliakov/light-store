import { OrderStatus } from "src/app/modules/shared/models/order-status"

export interface IChangeOrderStatusDto {
  id: string
  status: OrderStatus
}
