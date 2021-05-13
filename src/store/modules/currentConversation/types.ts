import { IConversation } from "../conversations/types";
import { IUser } from "../user/types";

export interface IMessage {
  creator: IUser;
  dest: IConversation | string;
  text: string;
  read: boolean;
  marked: boolean;
}


export enum LoadingCurrentConversationState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ICurrentConversationState {
  currentConversation: IConversation | undefined;
  messages: IMessage[] | [];
  loadingState: LoadingCurrentConversationState;
}
