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
      state.loadingState = LoadingConversationsState.LOADING;
    },
    setConversations(state, action: PayloadAction<IConversation[] | []>) {
      state.conversations = action.payload;
      state.loadingState = LoadingConversationsState.LOADED;
    },
    setConversationsLoadingState(
      state,
      action: PayloadAction<LoadingConversationsState>
    ) {
      state.loadingState = action.payload;
    },
    joinAllConversations(state) {
      state.loadingState = LoadingConversationsState.LOADING;
    }
  },
});

export const {
  fetchConversations,
  setConversations,
  setConversationsLoadingState,
  joinAllConversations
} = conversationsSlice.actions;
export default conversationsSlice.reducer;
