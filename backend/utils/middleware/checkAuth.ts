import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { IUserDocument, UserModel } from "../../models/UserModel";
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
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    );

    if (!decoded) {
      res.sendStatus(401)
    }

    req.userId = (decoded as IToken).userId;

    UserModel.findById(req.userId).then((user: IUserDocument | null) => {
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
      .catch((err: any) => {
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
};