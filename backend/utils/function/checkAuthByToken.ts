import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

export interface IToken {
  userId: string
} 

export const checkAuthByToken = (token: string) => {
  if (!token) {
    return null
  } else {
    return jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, decoded) => {
      if (err) {
        return null
      } else {
        return (decoded as IToken).userId;
      }
    });
  }
};
