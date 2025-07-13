import type { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    console.log('Pasó por el middleware')
    next()
  }
}