import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LoadingJoinConversationsState,
  IJoinConversationsState,
} from "./types";

const initialState = {
  fetchingConversations: [],
  errorConversations: [],
  loadingState: LoadingJoinConversationsState.NEVER, // loading state using for join all button
} as IJoinConversationsState;

const joinConversationsSlice = createSlice({
  name: "joinConversations",
  initialState,
  reducers: {
    fetchJoinOneConversation(state, action: PayloadAction<string>) {
      const index = state.errorConversations.indexOf(action.payload);
      if (index !== -1) state.errorConversations.splice(index, 1);
      state.fetchingConversations.push(action.payload);
    },
    successJoinOneConversation(state, action: PayloadAction<string>) {
      const index = state.fetchingConversations.indexOf(action.payload);
      if (index !== -1) state.fetchingConversations.splice(index, 1);
    },
    errorJoinOneConversation(state, action: PayloadAction<string>) {
      const index = state.fetchingConversations.indexOf(action.payload);
      if (index !== -1) state.fetchingConversations.splice(index, 1);
      state.errorConversations.push(action.payload);
    },
    fetchJoinAllConversations(state, action: PayloadAction<string[]>) {
      state.loadingState = LoadingJoinConversationsState.LOADING;
      state.errorConversations = [];
      state.fetchingConversations = action.payload;
    },
    errorJoinAllConversations(state, action: PayloadAction<string[]>) {
      state.fetchingConversations = [];
      state.errorConversations = action.payload;
    },
    setJoinConversationsLoadingState(
      state,
      action: PayloadAction<LoadingJoinConversationsState>
    ) {
      state.loadingState = action.payload;
    },
    clearJoinConversationsState() {
      return initialState;
    },
  },
});

export const {
  fetchJoinOneConversation,
  errorJoinOneConversation,
  successJoinOneConversation,
  setJoinConversationsLoadingState,
  fetchJoinAllConversations,
  errorJoinAllConversations,
  clearJoinConversationsState,
} = joinConversationsSlice.actions;
export default joinConversationsSlice.reducer;
