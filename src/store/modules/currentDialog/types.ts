import { IDialog } from "../dialogs/types";

export enum LoadingCurrentDialogState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ICurrentDialogState {
  currentDialog: IDialog | undefined;
  loadingState: LoadingCurrentDialogState;
}
