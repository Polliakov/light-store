import { ICreateDeliveryInformationDto } from "./create-delivery-information-dto";
import { IProductInOrderDto } from "./product-in-order-dto";

export interface ICreateOrderDto {
  warehouseId: string
  deliveryInformation?: ICreateDeliveryInformationDto | null
  productsInOrder: IProductInOrderDto[]
}
