import { IConversation } from "../conversations/types";

export enum LoadingCurrentConversationState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ICurrentConversationState {
  currentConversation: IConversation | undefined;
  loadingState: LoadingCurrentConversationState;
}
