import { IDialog } from "../dialogs/types";

export enum LoadingCurrentDialogsState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ICurrentDialogsState {
  dialogs: IDialog[];
  loadingState: LoadingCurrentDialogsState;
}
