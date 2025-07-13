import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./envs";

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        JWT_SECRET!,
        {
          expiresIn: "2h",
          algorithm: "HS256",
        },
        (err, token) => {
          if (err) {
            console.log(err);
            return resolve(null);
          }
          resolve(token!);
        }
      );
    });
  }
}
