import { IConversation } from "../conversations/types";
import { IUser } from "../user/types";

export interface IMessage {
  creator: IUser;
  dest: IConversation | string;
  text: string;
  read: boolean;
}


export enum LoadingMessagesState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface IMessagesState {
  messages: IMessage[] | [];
  loadingState: LoadingMessagesState;
}
