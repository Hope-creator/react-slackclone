import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialog, IDialogsState, LoadingDialogsState } from "./types";

const initialState = {
  dialogs: [],
  loadingState: LoadingDialogsState.NEVER,
} as IDialogsState;

const dialogsSlice = createSlice({
  name: "Dialogs",
  initialState,
  reducers: {
    fetchDialogs(state) {
      state.loadingState = LoadingDialogsState.LOADING;
    },
    setDialogs(state, action: PayloadAction<IDialog[] | []>) {
      state.dialogs = action.payload;
      state.loadingState = LoadingDialogsState.LOADED;
    },
    setConversationsLoadingState(
      state,
      action: PayloadAction<LoadingDialogsState>
    ) {
      state.loadingState = action.payload;
    },
    addOneDialog(state, action: PayloadAction<IDialog>) {
      state.dialogs = [...state.dialogs, action.payload].sort((a, b) =>
        a.unread_count > b.unread_count ? 1 : -1
      );
    },
  },
});

export const {
  fetchDialogs,
  setDialogs,
  setConversationsLoadingState,
  addOneDialog,
} = dialogsSlice.actions;
export default dialogsSlice.reducer;
