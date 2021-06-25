import { IUser } from './../user/types';

export enum LoadingCurrentDMState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ICurrentDMState {
  partner: IUser | null;
  loadingState: LoadingCurrentDMState;
}
