import { IRootState } from "../../store";
import { LoadingCurrentAllDialogsState } from "./types";

export const selectCurrentAllDialogsState = (state: IRootState) =>
  state.currentAllDialogs;

export const selectCurrentAllDialogs = (state: IRootState) =>
  selectCurrentAllDialogsState(state).users;

export const selectCurrentAllDialogsPage = (state: IRootState) =>
  selectCurrentAllDialogsState(state).page;

export const selectCurrentAllDialogsSearchName = (state: IRootState) =>
  selectCurrentAllDialogsState(state).searchName;

export const selectCurrentAllDialogsCount = (state: IRootState) =>
  selectCurrentAllDialogsState(state).count;

export const selectCurrentAllDialogsTotalCount = (state: IRootState) =>
  selectCurrentAllDialogsState(state).totalCount;

export const selectCurrentAllDialogsLoadingState = (state: IRootState) =>
  selectCurrentAllDialogsState(state).loadingState;

export const selectIsCurrentAllDialogsLoaded = (state: IRootState) =>
  selectCurrentAllDialogsState(state).loadingState ===
  LoadingCurrentAllDialogsState.LOADED;
