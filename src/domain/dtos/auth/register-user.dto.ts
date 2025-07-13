import { Validator } from "@/config/validators";

export class RegisterUserDTO {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDTO?] {
    if (!object) return ["Request body is required", undefined];

    const { name, email, password } = object;

    if (!name) return ["Name is required", undefined];

    if (!email) return ["Email is required", undefined];

    if (!Validator.email.test(email)) return ["Email is invalid", undefined];

    if (!password) return ["Password is required", undefined];

    if (!Validator.password.test(password)) {
      return [
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character",
        undefined,
      ];
    }

    return [undefined, new RegisterUserDTO(name, email, password)];
  }
}
