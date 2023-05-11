import { IPerson } from "../../shared/models/person";
import { UserRole } from "../../shared/models/user-role";

export interface IEmployee extends IPerson {
  id: string
  email: string
  role: UserRole
}
