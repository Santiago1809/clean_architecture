import { JwtAdapter } from "@/config/jwt";
import { UserModel } from "@/data/models/user.model";
import { RegisterUserDTO } from "@/domain/dtos/auth/register-user.dto";
import { CustomError } from "@/domain/errors/custom.error";
import type { AuthRepository } from "@/domain/repositories/auth.repository";
import type { CustomRequest } from "@/types";
import type { Request, Response } from "express";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

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
    this.authRepository
      .register(registerUserDTO!)
      .then(async (user) => {
        res.json({
          user,
          token: await JwtAdapter.generateToken({ id: user.id }),
        });
      })
      .catch((error) => this.handleError(error, res));
  };

  login = (req: Request, res: Response) => {
    res.json("Login user controller");
  };

  getUsers = (req: CustomRequest, res: Response) => {
    UserModel.find()
      .then((users) => res.json({ token: req.token }))
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };
}
