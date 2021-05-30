import { IFile } from "../../../services/api/uploadApi";
import { IConversation } from "../conversations/types";
import { IUser } from "../user/types";

export interface IMessage {
  _id: string;
  creator: IUser;
  dest: IConversation | string;
  text: string;
  read: boolean;
  marked: boolean;
  attachments: IFile[];
  createdAt: string;
}

export enum LoadingCurrentConversationState {
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

export interface ICurrentConversationState {
  currentConversation: IConversation | undefined;
  messages: IMessage[];
  loadingState: LoadingCurrentConversationState;
  loadingSendMessageState: LoadingSendMessageState;
}
