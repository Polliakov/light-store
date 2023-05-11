export interface ICreateCustomerDto {
  email: string
  password: string
  surname: string
  name: string
  patronymic?: string | null
  cartId?: string | null
}
