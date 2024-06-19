import { UserRegister } from "./userRegister.interface"

export interface AuthResponse {
  token: string
  data: UserRegister;
}