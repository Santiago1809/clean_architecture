import { RegisterUserDTO } from "@/domain/dtos/auth/register-user.dto";
import { LoginUserDTO } from "@/domain/dtos/auth/login-user.dto";
import { CustomError } from "@/domain/errors/custom.error";
import type { RegisterUser } from "@/domain/use-cases/auth/register-user.use-case";
import type { LoginUser } from "@/domain/use-cases/auth/login-user.use-case";
import type { GetUserProfile } from "@/domain/use-cases/auth/get-user-profile.use-case";
import type { CustomRequest } from "@/types";
import type { Request, Response } from "express";

export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUser,
    private readonly loginUserUseCase: LoginUser,
    private readonly getUserProfileUseCase: GetUserProfile
  ) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  register = (req: Request, res: Response) => {
    const [error, registerUserDTO] = RegisterUserDTO.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    this.registerUserUseCase
      .execute(registerUserDTO!)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => this.handleError(error, res));
  };

  login = (req: Request, res: Response) => {
    const [error, loginUserDTO] = LoginUserDTO.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    this.loginUserUseCase
      .execute(loginUserDTO!)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => this.handleError(error, res));
  };

  getUserProfile = (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    this.getUserProfileUseCase
      .execute({ userId })
      .then((result) => {
        res.json(result);
      })
      .catch((error) => this.handleError(error, res));
  };

  getUsers = (req: CustomRequest, res: Response) => {
    res.json({
      message: "Users endpoint accessed successfully",
      token: req.token,
    });
  };
}
