export interface ICompany {
  id: number;
  name: string;
  primaryOwner: {
    userId: number,
    email: string
  }
}

export enum LoadingCompanyState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export interface ICompanyState {
  company: ICompany | null;
  loadingState: LoadingCompanyState;
}