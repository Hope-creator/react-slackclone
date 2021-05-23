import { IUser } from "../user/types";

export enum LoadingCurrentMembersState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ICurrentMembersState {
  members: IUser[] | [];
  loadingState: LoadingCurrentMembersState;
}
