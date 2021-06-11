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
  const token = req.session.token;
  if (!token) {
    res.status(401).json({ status: "error", data: "Not authorazite" });
  } else {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: jwt.VerifyErrors | null, decoded) => {
        if (err) {
          res.sendStatus(401);
        } else {
          req.userId = (decoded as IToken).userId;
          UserModel.findOneAndUpdate(
            { _id: req.userId },
            {
              last_seen: new Date(),
            },
            { new: true }
          )
            .then((user) => {
              user
                ? (req.user = user)
                : res
                    .status(404)
                    .json({ status: "error", data: "User is not find" });
              next();
            })
            .catch((err) => {
              res
                .status(500)
                .json({ status: "error", data: "Something went wrong" });
              console.log(
                "checkAuthWithUpdate / Cannot update last seen:",
                err
              );
            });
        }
      }
    );
  }
};
