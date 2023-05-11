import { IPerson } from "../../shared/models/person"

export interface ICustomer extends IPerson {
  cartId: string
}
