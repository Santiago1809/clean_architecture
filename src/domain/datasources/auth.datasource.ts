import type { RegisterUserDTO } from "../dtos/auth/register-user.dto";
import type { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {
  abstract register(registerUserDto: RegisterUserDTO): Promise<UserEntity>;
}
