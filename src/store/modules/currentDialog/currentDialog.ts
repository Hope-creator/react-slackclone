import { IUser } from "../user/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingCurrentDialogState, ICurrentDialogState } from "./types";

const initialState = {
  partner: null,
  loadingState: LoadingCurrentDialogState.NEVER,
} as ICurrentDialogState;

const currentDialogSlicer = createSlice({
  name: "currentDialog",
  initialState,
  reducers: {
    fetchCurrentDialog(state, payload: PayloadAction<string>) {
      state.loadingState = LoadingCurrentDialogState.LOADING;
    },
    setCurrentDialogPartner(state, action: PayloadAction<IUser>) {
      state.partner = action.payload;
    },
    updateCurrentDialogPartner(state, action: PayloadAction<IUser>) {
      if (state.partner && state.partner._id === action.payload._id) {
        state.partner = action.payload;
      }
    },
    setCurrentDialogLoadingState(
      state,
      action: PayloadAction<LoadingCurrentDialogState>
    ) {
      state.loadingState = action.payload;
    },
    clearCurrentDialogState() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentDialog,
  setCurrentDialogPartner,
  updateCurrentDialogPartner,
  setCurrentDialogLoadingState,
  clearCurrentDialogState,
} = currentDialogSlicer.actions;
export default currentDialogSlicer.reducer;
