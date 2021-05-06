import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import {Response, Request} from "express";

export interface IToken {
  userId: string
} 

export const authencticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.session.token;
  if (!token) {
    res.status(401).json({ status: "error", data: "Not authorazite" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, decoded) => {
      if (err) {
        res.sendStatus(401);
      } else {
        req.userId = (decoded as IToken).userId;
        next();
      }
    });
  }
};
