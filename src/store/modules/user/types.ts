export interface IUser {
  id: number;
  team_id: number;
  name: string;
  real_name: string;
  avatar: string;
  email: string;
  is_admin: boolean;
  updated: number;
}

export enum LoadingUserState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface IUserState {
  user: IUser | null;
  loadingState: LoadingUserState;
}