import { IUser } from "./../user/types";

export enum LoadingCurrentDialogState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ICurrentDialogState {
  partner: IUser | null;
  loadingState: LoadingCurrentDialogState;
}
