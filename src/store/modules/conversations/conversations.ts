import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IConversation,
  IConversationsState,
  LoadingConversationsState,
} from "./types";

const initialState = {
  conversations: [],
  currentConversation: undefined,
  loadingCurrentConversationState: LoadingConversationsState.NEVER,
  loadingState: LoadingConversationsState.NEVER,
} as IConversationsState;

const conversationsSlice = createSlice({
  name: "Conversations",
  initialState,
  reducers: {
    fetchConversations(state) {
      state.loadingState = LoadingConversationsState.LOADED;
    },
    setConversations(state, action: PayloadAction<IConversation[] | []>) {
      state.conversations = action.payload;
    },
    setConversationsLoadingState(
      state,
      action: PayloadAction<LoadingConversationsState>
    ) {
      state.loadingState = action.payload;
    },
  },
});

export const {
  fetchConversations,
  setConversations,
  setConversationsLoadingState,
} = conversationsSlice.actions;
export default conversationsSlice.reducer;
