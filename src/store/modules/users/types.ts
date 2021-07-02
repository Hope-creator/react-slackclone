import { IUser } from "../user/types";

export enum LoadingUsersState {
  ERROREMAIL = "ERROREMAIL",
  ERRORLOGIN = "ERRORLOGIN",
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  LOADINGCREATE = "LOADINGCREATE",
  LOADINGLOGIN = "LOADINGLOGIN",
  NEVER = "NEVER",
}

export interface IUsersState {
  users: IUser[];
  page: number;
  count: number;
  totalCount: number;
  loadingState: LoadingUsersState;
}
