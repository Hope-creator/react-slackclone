import { IUser } from "../user/types";

export interface IDialog {
  _id: string;
  createdAt: Date;
  creator: string | IUser;
  members: string[];
  unread_count: number;
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
