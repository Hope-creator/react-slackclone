import { IRootState } from "../../store";

export const selectCompanyState = (state: IRootState) => state.company;

export const selectCompany = (state: IRootState) =>
  selectCompanyState(state).company;

export const selectCompanyLoadingState = (state: IRootState) =>
  selectCompanyState(state).loadingState;
