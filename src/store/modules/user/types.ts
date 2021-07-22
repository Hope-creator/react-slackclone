export interface ICompany {
  _id: string;
  name: string;
}

export interface IUser {
  _id: string;
  company: ICompany;
  name: string;
  avatar?: string;
  email: string;
  is_admin: boolean;
  conversations: string[];
  display_name?: string;
  work?: string;
  phone?: number;
  createdAt: string;
  online: boolean;
  away: boolean;
}

export enum LoadingUserState {
  ERROREMAIL = "ERROREMAIL",
  ERRORLOGIN = "ERRORLOGIN",
  ERRORUPDATE = "ERRORUPDATE",
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  LOADINGCREATE = "LOADINGCREATE",
  LOADINGLOGIN = "LOADINGLOGIN",
  LOADINGUPDATE = "LOADINGUPDATE",
  NEVER = "NEVER",
}

export interface IUserState {
  user: IUser | null;
  loadingState: LoadingUserState;
}
