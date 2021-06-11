import { IUser } from "../user/types";

export enum LoadingConversationsMembersState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface IConversationMembersState {
  members: IUser[];
  loadingState: LoadingConversationsMembersState;
}
