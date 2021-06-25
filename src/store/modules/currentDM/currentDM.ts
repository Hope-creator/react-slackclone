import { IUser } from "./../user/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingCurrentDMState, ICurrentDMState } from "./types";

const initialState = {
  partner: null,
  loadingState: LoadingCurrentDMState.NEVER,
} as ICurrentDMState;

const currentDMSlicer = createSlice({
  name: "currentDM",
  initialState,
  reducers: {
    fetchCurrentDM(state, payload: PayloadAction<string>) {
      state.loadingState = LoadingCurrentDMState.LOADING;
    },
    setCurrentDMPartner(state, action: PayloadAction<IUser>) {
      state.partner = action.payload;
    },
    setCurrentDMLoadingState(state, action: PayloadAction<LoadingCurrentDMState>) {
      state.loadingState = action.payload;
    },
    clearCurrentDMState() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentDM,
  setCurrentDMPartner,
  setCurrentDMLoadingState,
  clearCurrentDMState,
} = currentDMSlicer.actions;
export default currentDMSlicer.reducer;
