import { BcryptAdapter } from "@/config/bcrypt";
import { RegisterUser } from "@/domain/use-cases/auth/register-user.use-case";
import { LoginUser } from "@/domain/use-cases/auth/login-user.use-case";
import { GetUserProfile } from "@/domain/use-cases/auth/get-user-profile.use-case";
import { AuthDatasourceImpl } from "@infrastructure/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "@infrastructure/repositories/auth.repository.impl";
import { Router } from "express";
import { AuthController } from "./controller";
import { AuthMiddleware } from "./middleware/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authDatasource = new AuthDatasourceImpl(
      BcryptAdapter.hash,
      BcryptAdapter.compare
    );
    const authRepository = new AuthRepositoryImpl(authDatasource);

    // Use cases
    const registerUserUseCase = new RegisterUser(authRepository);
    const loginUserUseCase = new LoginUser(authRepository);
    const getUserProfileUseCase = new GetUserProfile(authRepository);

    const controller = new AuthController(
      registerUserUseCase,
      loginUserUseCase,
      getUserProfileUseCase
    );

    router.post("/signup", controller.register);
    router.post("/signin", controller.login);
    router.get(
      "/profile",
      [AuthMiddleware.validateJWT],
      controller.getUserProfile
    );
    router.get("/", [AuthMiddleware.validateJWT], controller.getUsers);

    return router;
  }
}
