import { UserRole } from "./user-role"

export interface IUser {
  id: string
  email: string
  role: UserRole
}
