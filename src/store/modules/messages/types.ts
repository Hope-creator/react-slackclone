import { IFile } from "../../../services/api/uploadApi";
import { IConversation } from "../conversations/types";
import { IUser } from "../user/types";

export interface IMessage extends Object {
  _id: string;
  creator: IUser;
  dest: IConversation | string;
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
  loadingState: LoadingMessagesState;
  loadingSendMessageState: LoadingSendMessageState;
}
