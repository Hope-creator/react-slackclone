import { IUser } from "../user/types";

export enum LoadingCurrentAllDMState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ICurrentAllDMState {
  users: IUser[];
  searchName: string;
  page: number;
  count: number;
  totalCount: number;
  loadingState: LoadingCurrentAllDMState;
}
