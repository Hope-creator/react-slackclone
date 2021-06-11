import { IMessage } from "../messages/types";
import { IUser } from "../user/types";

export interface IConversation {
  _id: string;
  name: string;
  is_channel?: boolean;
  createdAt: Date;
  creator?: string | IUser;
  purpose?: string;
  topic?: string;
  messages: IMessage[];
  is_private: boolean;
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
  conversations: IConversation[];
  loadingState: LoadingConversationsState;
}
