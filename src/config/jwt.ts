import jwt from "jsonwebtoken";

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        "SEED",
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
