import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { UserModel } from "../../models/UserModel";
import dotenv from "dotenv";
dotenv.config();

export interface IToken {
  userId: string;
}

export const authencticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.session ? req.session.token : null;
  if (!token) {
    res.status(401).json({ status: "error", data: "Not authorazite" });
  } else {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: jwt.VerifyErrors | null, decoded: object | undefined) => {
        if (err) {
          res.sendStatus(401);
        } else {
          req.userId = (decoded as IToken).userId;
          UserModel.findById(req.userId)
            .then((user) => {
              if (user) {
                req.user = user;
                next();
              } else {
                res.status(404).json({
                  status: "error",
                  data: "Token check failed: user do not exists",
                });
                return;
              }
            })
            .catch((err) => {
              res
                .status(500)
                .json({ status: "error", data: "Something went wrong" });
              console.log(
                "checkAuthWithUpdate / Cannot update last seen:",
                err
              );
              return;
            });
        }
      }
    );
  }
};