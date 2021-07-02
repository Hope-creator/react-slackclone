import { IUser } from "../user/types";

export enum LoadingCurrentAllDialogsState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ICurrentAllDialogsState {
  users: IUser[];
  searchName: string;
  page: number;
  count: number;
  totalCount: number;
  loadingState: LoadingCurrentAllDialogsState;
}
