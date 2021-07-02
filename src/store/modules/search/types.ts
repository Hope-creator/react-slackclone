import { IUser } from "../user/types";
import { IConversation } from "./../conversations/types";

export enum LoadingSearchState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export enum SearchItemType {
  CONVERSATION = "CONVERSATION",
  USER = "USER",
  CUSTOM = "CUSTOM",
}

export interface ISearchItem {
  item: IConversation | IUser | string;
  type: SearchItemType;
}

export interface ISearchState {
  search: string;
  pageUsers: number;
  pageConversations: number;
  count: number;
  results: ISearchItem[];
  totalCountUsers: number;
  totalCountConversations: number;
  totalCount: number;
  resultsConversations: IConversation[];
  resultsUsers: IUser[];
  resultsCustom: string[];
  loadingState: LoadingSearchState;
}
