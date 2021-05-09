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
    fetchConverastions(state) {
      state.loadingState = LoadingConversationsState.LOADED;
    },
    setConversations(state, action: PayloadAction<IConversation[] | []>) {
      state.conversations = [...state.conversations, ...action.payload];
    },
    setConversationsLoadingState(
      state,
      action: PayloadAction<LoadingConversationsState>
    ) {
      state.loadingState = action.payload;
    },
    fetchCurrentConversation(state, payload: PayloadAction<string>) {
      state.loadingCurrentConversationState = LoadingConversationsState.LOADING;
    },
    setCurrentConversations(state, action: PayloadAction<IConversation>) {
      state.currentConversation = action.payload;
    },
    setCurrentConversationsLoadingState(
      state,
      action: PayloadAction<LoadingConversationsState>
    ) {
      state.loadingCurrentConversationState = action.payload;
    },
  },
});

export const {
  fetchConverastions,
  setConversations,
  setConversationsLoadingState,
  fetchCurrentConversation,
  setCurrentConversations,
  setCurrentConversationsLoadingState
} = conversationsSlice.actions;
export default conversationsSlice.reducer;
