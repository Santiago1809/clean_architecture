import type { AuthDatasource } from "@domain/datasources/auth.datasource";
import type { RegisterUserDTO } from "@domain/dtos/auth/register-user.dto";
import type { UserEntity } from "@domain/entities/user.entity";
import type { AuthRepository } from "@domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
    return await this.authDatasource.register(registerUserDTO);
  }
}
