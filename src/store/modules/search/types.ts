import { IConversation } from './../conversations/types';
import { IDialog } from './../dialogs/types';


export enum LoadingSearchState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ISearchState {
  search: string;
  resultsConversations: IConversation[];
  resultsDialogs: IDialog[];
  resultsCustom: string[];
  loadingState: LoadingSearchState;
}
