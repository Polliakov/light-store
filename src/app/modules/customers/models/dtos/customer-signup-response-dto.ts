import { ICustomer } from "../customer";
import { IUser } from "src/app/modules/shared/models/user";

export interface ICustomerSignUpResponseDto {
  appUser: IUser
  customer: ICustomer
  token: string
}
