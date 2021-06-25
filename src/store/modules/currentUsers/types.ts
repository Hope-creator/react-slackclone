import { IUser } from "../user/types";

export enum LoadingCurrentUsersState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ICurrentUsersState {
  users: IUser[];
  searchName: string;
  page: number;
  count: number;
  totalCount: number;
  loadingState: LoadingCurrentUsersState;
}
