export interface ICompany {
  _id: string,
  name: string,
  primary_owner: {
    user_id: string,
    email: string,
  },
  members: IUser[] | never[]
}


export interface IUser {
  _id: string;
  company: ICompany;
  name: string;
  real_name: string;
  avatar: string;
  email: string;
  is_admin: boolean;
  work?: string;
  phone?: number;
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
