export interface ICompany {
  _id: string;
  name: string;
  primary_owner: {
    user_id: string;
    email: string;
  };
  members: IUser[] | never[];
}

export interface IUser {
  _id: string;
  company: ICompany;
  name: string;
  avatar: string;
  email: string;
  is_admin: boolean;
  conversations: string[];
  display_name?: string;
  work?: string;
  phone?: number;
  createdAt: string;
}

export enum LoadingUserState {
  ERROREMAIL = "ERROREMAIL",
  ERRORLOGIN= "ERRORLOGIN",
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  LOADINGCREATE = "LOADINGCREATE",
  LOADINGLOGIN = "LOADINGLOGIN",
  NEVER = "NEVER",
}

export interface IUserState {
  user: IUser | null;
  loadingState: LoadingUserState;
}
