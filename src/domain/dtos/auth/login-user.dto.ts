import { Validator } from "@/config/validators";

export class LoginUserDTO {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
    if (!object) return ["Request body is required", undefined];

    const { email, password } = object;

    if (!email) return ["Email is required", undefined];

    if (!Validator.email.test(email)) return ["Email is invalid", undefined];

    if (!password) return ["Password is required", undefined];

    return [undefined, new LoginUserDTO(email, password)];
  }
}
