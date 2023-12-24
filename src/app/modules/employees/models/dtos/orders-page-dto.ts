import { IOrder } from "src/app/modules/shared/models/order"

export interface IOrdersPageDto {
  foundCount: number
  orders: IOrder[]
}
