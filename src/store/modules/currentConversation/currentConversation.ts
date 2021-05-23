import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConversation } from "../conversations/types";
import {
  ICurrentConversationState,
  IMessage,
  LoadingCurrentConversationState,
} from "./types";

const initialState = {
  currentConversation: undefined,
  messages: [],
  loadingState: "NEVER",
} as ICurrentConversationState;

const currentConversationSlicer = createSlice({
  name: "currentConversation",
  initialState,
  reducers: {
    fetchCurrentConversation(state, payload: PayloadAction<string>) {
      state.loadingState = LoadingCurrentConversationState.LOADING;
    },
    setCurrentConversation(state, action: PayloadAction<IConversation>) {
      state.currentConversation = action.payload;
    },
    setCurrentConversationLoadingState(
      state,
      action: PayloadAction<LoadingCurrentConversationState>
    ) {
      state.loadingState = action.payload;
    },
    setMessages(state, action: PayloadAction<IMessage[] | []>) {
      state.messages = [...action.payload];
    },
    clearCurrentConversation() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentConversation,
  setCurrentConversation,
  setCurrentConversationLoadingState,
  setMessages,
  clearCurrentConversation,
} = currentConversationSlicer.actions;
export default currentConversationSlicer.reducer;
