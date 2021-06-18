import { IRootState } from "../../store";

export const selectCurrentDialogsState = (state: IRootState) =>
  state.currentDialogs;

export const selectCurrentDialogs= (state: IRootState) =>
  selectCurrentDialogsState(state).dialogs;

export const selectCurrentDialogsLoadingState = (state: IRootState) =>
  selectCurrentDialogsState(state).loadingState;
