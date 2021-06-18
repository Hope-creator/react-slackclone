import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialog } from "../dialogs/types";
import { LoadingCurrentDialogsState, ICurrentDialogsState } from "./types";

const initialState = {
  dialogs: [],
  loadingState: LoadingCurrentDialogsState.NEVER,
} as ICurrentDialogsState;

const currentConversationSlicer = createSlice({
  name: "currentConversation",
  initialState,
  reducers: {
    fetchCurrentDialogs(state) {
      state.loadingState = LoadingCurrentDialogsState.LOADING;
    },
    setCurrentDialogs(state, action: PayloadAction<IDialog[]>) {
      state.dialogs = action.payload;
    },
    setCurrentDialogsLoadingState(
      state,
      action: PayloadAction<LoadingCurrentDialogsState>
    ) {
      state.loadingState = action.payload;
    },
    addOneCurrentDialogs(state, action: PayloadAction<IDialog>) {
      state.dialogs.unshift(action.payload);
    },
    clearCurrentDialogsState() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentDialogs,
  setCurrentDialogs,
  setCurrentDialogsLoadingState,
  addOneCurrentDialogs,
  clearCurrentDialogsState,
} = currentConversationSlicer.actions;
export default currentConversationSlicer.reducer;
