import { IUserDocument } from "../../models/UserModel";

declare global {
  namespace Express {
    export interface Request {
      userId: Schema.Types.ObjectId;
      user: IUserDocument;
    }
  }
}
