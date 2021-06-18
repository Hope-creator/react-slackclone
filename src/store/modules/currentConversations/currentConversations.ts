import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConversation } from "../conversations/types";
import {
  ICurrentConversationsState,
  LoadingCurrentConversationsState,
} from "./types";

const initialState = {
  conversations: [],
  loadingState: LoadingCurrentConversationsState.NEVER,
} as ICurrentConversationsState;

const currentConversationsSlicer = createSlice({
  name: "currentConversations",
  initialState,
  reducers: {
    fetchCurrentConversations(state, payload: PayloadAction<string>) {
      state.loadingState = LoadingCurrentConversationsState.LOADING;
    },
    setCurrentConversations(state, action: PayloadAction<IConversation[]>) {
      state.conversations = action.payload;
    },
    setCurrentConversationsLoadingState(
      state,
      action: PayloadAction<LoadingCurrentConversationsState>
    ) {
      state.loadingState = action.payload;
    },
    clearCurrentConversationsState() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentConversations,
  setCurrentConversations,
  setCurrentConversationsLoadingState,
  clearCurrentConversationsState,
} = currentConversationsSlicer.actions;
export default currentConversationsSlicer.reducer;
