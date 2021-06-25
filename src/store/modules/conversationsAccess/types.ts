export enum LoadingConversationsAccessState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface IConversationsAccessState {
  fetchingConversations: string[];
  errorConversations: string[];
  loadingState: LoadingConversationsAccessState;
}
