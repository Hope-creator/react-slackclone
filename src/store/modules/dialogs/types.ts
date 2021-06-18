import { IMessage } from "../messages/types";
import { IUser } from "../user/types";

export interface IDialog {
  _id: string;
  createdAt: Date;
  creator: IUser;
  partner: IUser;
  last_message?: IMessage;
  unread_count: number;
  updatedAt: Date;
}

export enum LoadingDialogsState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface IDialogsState {
  dialogs: IDialog[];
  loadingState: LoadingDialogsState;
}
