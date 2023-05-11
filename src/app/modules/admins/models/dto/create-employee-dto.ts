export class ICreateEmployeeDto {
  email: string
  password: string
  surname: string
  name: string
  patronymic?: string | null
  role: number
}
