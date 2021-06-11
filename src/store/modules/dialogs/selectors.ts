import { IRootState } from "../../store";

export const selectDialogsState = (state: IRootState) => state.dialogs;

export const selectDialogs = (state: IRootState) =>
  selectDialogsState(state).dialogs;

export const selectDialogsLoadingState = (state: IRootState) =>
  selectDialogsState(state).loadingState;
