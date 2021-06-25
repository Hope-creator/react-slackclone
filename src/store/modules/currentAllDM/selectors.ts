import { IRootState } from "../../store";

export const selectCurrentAllDMState = (state: IRootState) =>
  state.currentAllDM;

export const selectCurrentAllDM = (state: IRootState) =>
  selectCurrentAllDMState(state).users;

export const selectCurrentAllDMPage = (state: IRootState) =>
  selectCurrentAllDMState(state).page;

export const selectCurrentAllDMSearchName = (state: IRootState) =>
  selectCurrentAllDMState(state).searchName;

export const selectCurrentAllDMCount = (state: IRootState) =>
  selectCurrentAllDMState(state).count;

export const selectCurrentAllDMTotalCount = (state: IRootState) =>
  selectCurrentAllDMState(state).totalCount;

export const selectCurrentAllDMLoadingState = (state: IRootState) =>
  selectCurrentAllDMState(state).loadingState;
