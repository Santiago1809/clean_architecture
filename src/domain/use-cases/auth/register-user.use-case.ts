import { JwtAdapter } from "@/config/jwt";
import { CustomError } from "../../errors/custom.error";
import type { AuthRepository } from "../../repositories/auth.repository";
import type { RegisterUserDTO } from "../../dtos/auth/register-user.dto";
import type { UseCase } from "../use-case";

interface RegisterUserUseCase
  extends UseCase<RegisterUserDTO, RegisterUserResponse> {}

export interface RegisterUserResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(
    registerUserDto: RegisterUserDTO
  ): Promise<RegisterUserResponse> {
    const user = await this.authRepository.register(registerUserDto);

    const token = await JwtAdapter.generateToken({ id: user.id });

    if (!token) {
      throw CustomError.internalServer("Error generating token");
    }

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
