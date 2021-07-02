import { IRootState } from "../../store";
import { LoadingCurrentDialogState } from "./types";

export const selectCurrentDialogState = (state: IRootState) =>
  state.currentDialog;

export const selectCurrentDialogPartner = (state: IRootState) =>
  selectCurrentDialogState(state).partner;

export const selectCurrentDialogLoadingState = (state: IRootState) =>
  selectCurrentDialogState(state).loadingState;

export const selectIsCurrentDialogLoaded = (state: IRootState) =>
  selectCurrentDialogState(state).loadingState ===
  LoadingCurrentDialogState.LOADED;
