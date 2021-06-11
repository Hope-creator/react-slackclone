import { IRootState } from "../../store";

export const selectCurrentDialogState = (state: IRootState) =>
  state.currentDialog;

export const selectCurrentDialog = (state: IRootState) =>
  selectCurrentDialogState(state).currentDialog;

export const selectCurrentDialogLoadingState = (state: IRootState) =>
  selectCurrentDialogState(state).loadingState;
