import { IConversation } from "../conversations/types";

export enum LoadingCurrentConversationsState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ICurrentConversationsState {
  conversations: IConversation[];
  searchName: string;
  page: number;
  count: number;
  totalCount: number;
  loadingState: LoadingCurrentConversationsState;
}
