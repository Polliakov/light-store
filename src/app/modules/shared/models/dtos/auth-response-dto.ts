import { IUser } from '../user';

export interface IAuthResponseDto {
  appUser: IUser
  token: string
}
