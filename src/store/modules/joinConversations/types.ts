export enum LoadingJoinConversationsState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface IJoinConversationsState {
  fetchingConversations: string[];
  errorConversations: string[];
  loadingState: LoadingJoinConversationsState;
}
