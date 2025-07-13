import type { RegisterUserDTO } from "../dtos/auth/register-user.dto";
import type { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
  abstract register(registerUserDTO: RegisterUserDTO): Promise<UserEntity>;
}
