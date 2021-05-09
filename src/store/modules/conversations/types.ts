import { IMessage } from "../messages/types";
import { IUser } from "../user/types";

export interface IPurpose {
  value: string;
  creator: string;
}

export interface ITopic extends IPurpose {}

export interface IConversation {
  _id: string;
  name: string;
  is_channel?: boolean;
  created: Date;
  creator?: string;
  purpose?: IPurpose;
  topic?: ITopic;
  messages: IMessage[];
  is_private: boolean;
  members: IUser[] | string[];
  num_members: number;
  unread_count: number;
}

export enum LoadingConversationsState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface IConversationsState {
  conversations: IConversation[] | [];
  loadingState: LoadingConversationsState;
  currentConversation: IConversation | undefined;
  loadingCurrentConversationState: LoadingConversationsState;
}
