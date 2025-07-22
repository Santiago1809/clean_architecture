import { JwtAdapter } from "@/config/jwt";
import { CustomError } from "../../errors/custom.error";
import type { AuthRepository } from "../../repositories/auth.repository";
import type { LoginUserDTO } from "../../dtos/auth/login-user.dto";
import type { UseCase } from "../use-case";

interface LoginUserUseCase extends UseCase<LoginUserDTO, LoginUserResponse> {}

export interface LoginUserResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export class LoginUser implements LoginUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(loginUserDto: LoginUserDTO): Promise<LoginUserResponse> {
    const user = await this.authRepository.login(loginUserDto);

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
