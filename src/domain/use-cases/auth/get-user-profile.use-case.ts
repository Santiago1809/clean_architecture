import type { AuthRepository } from "../../repositories/auth.repository";
import type { UseCase } from "../use-case";

interface GetUserProfileUseCase
  extends UseCase<GetUserProfileParams, GetUserProfileResponse> {}

export interface GetUserProfileParams {
  userId: string;
}

export interface GetUserProfileResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string[];
    img?: string;
  };
}

export class GetUserProfile implements GetUserProfileUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(params: GetUserProfileParams): Promise<GetUserProfileResponse> {
    const user = await this.authRepository.findUserById(params.userId);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        img: user.img,
      },
    };
  }
}
