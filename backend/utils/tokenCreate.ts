import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export const tokenCreate = (id: string) => {
     const token = jwt.sign(
        {
          userId: id,
        },
        (process.env.JWT_SECRET as string) || "random-secret-token",
        {
          expiresIn: 60 * 60 * 24 * 14,
        }
      );
      return token
}