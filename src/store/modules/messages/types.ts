import { IFile } from "../../../services/api/uploadApi";
import { IUser } from "../user/types";

export interface IMessage extends Object {
  _id: string;
  creator: IUser;
  dest: string;
  text: string;
  unreadBy: string[];
  marked: boolean;
  attachments: IFile[];
  createdAt: string;
}

export enum LoadingMessagesState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export enum LoadingSendMessageState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface IMessagesState {
  messages: IMessage[];
  page: number;
  count: number;
  totalCount: number;
  loadingState: LoadingMessagesState;
  loadingSendMessageState: LoadingSendMessageState;
}
