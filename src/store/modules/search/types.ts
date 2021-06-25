import { IUser } from '../user/types';
import { IConversation } from './../conversations/types';


export enum LoadingSearchState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ISearchState {
  search: string;
  resultsConversations: IConversation[];
  resultsUsers: IUser[];
  resultsCustom: string[];
  loadingState: LoadingSearchState;
}
