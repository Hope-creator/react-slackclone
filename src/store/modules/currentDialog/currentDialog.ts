import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialog } from "../dialogs/types";
import { LoadingCurrentDialogState, ICurrentDialogState } from "./types";

const initialState = {
  currentDialog: undefined,
  loadingState: LoadingCurrentDialogState.NEVER,
} as ICurrentDialogState;

const currentDialogSlicer = createSlice({
  name: "currentDialog",
  initialState,
  reducers: {
    fetchCurrentDialog(state, payload: PayloadAction<string>) {
      state.loadingState = LoadingCurrentDialogState.LOADING;
    },
    setCurrentDialog(state, action: PayloadAction<IDialog>) {
      state.currentDialog = action.payload;
    },
    setCurrentDialogLoadingState(
      state,
      action: PayloadAction<LoadingCurrentDialogState>
    ) {
      state.loadingState = action.payload;
    },
    clearCurrentDialog() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentDialog,
  setCurrentDialog,
  setCurrentDialogLoadingState,
  clearCurrentDialog,
} = currentDialogSlicer.actions;
export default currentDialogSlicer.reducer;
