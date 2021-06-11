import { IUser } from "../user/types";

export enum LoadingSideInfoMembersState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ISideInfoMembersState {
  members: IUser[];
  loadingState: LoadingSideInfoMembersState;
}
