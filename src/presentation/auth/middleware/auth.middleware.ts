import { JwtAdapter } from "@/config/jwt";
import { CustomError } from "@/domain/errors/custom.error";
import type { CustomRequest } from "@/types";
import type { NextFunction, Response } from "express";

export class AuthMiddleware {
  static async validateJWT(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    const authorization = req.headers.authorization;

    if (!authorization)
      return res.status(401).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer token" });

    const token = authorization.split(" ").at(1) ?? "";
    try {
      const payload = await JwtAdapter.validateJwt(token);
      if (!payload) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.token = payload;
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        return res.status(401).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }

    next();
  }
}
