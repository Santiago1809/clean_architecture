import { UserModel } from "@/data/models/user.model";
import type { CompareFunction, HashFunction } from "@/types";
import type { AuthDatasource } from "@domain/datasources/auth.datasource";
import type { RegisterUserDTO } from "@domain/dtos/auth/register-user.dto";
import { UserEntity } from "@domain/entities/user.entity";
import { CustomError } from "@domain/errors/custom.error";
import { UserMapper } from "../mappers/user.mapper";

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction,
    private readonly comparePassword: CompareFunction
  ) {}
  async register(registerUserDto: RegisterUserDTO): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // Verificar si el correo electrónico ya está registrado
      const existingUser = await UserModel.findOne({ email }).exec();
      if (existingUser)
        throw CustomError.badRequest("Invalid registration information");
      // Hash de la constraseña
      const hasshedPassword = await this.hashPassword(password);
      const user = await UserModel.create({
        name,
        email,
        password: hasshedPassword,
      });
      await user.save();
      // Mapear la respuesta a nuestra entidad
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
