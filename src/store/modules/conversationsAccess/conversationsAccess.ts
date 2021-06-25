import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LoadingConversationsAccessState,
  IConversationsAccessState,
} from "./types";

const initialState = {
  fetchingConversations: [],
  errorConversations: [],
  loadingState: LoadingConversationsAccessState.NEVER, // loading state using for join all button
} as IConversationsAccessState;

const conversationsAccessSlice = createSlice({
  name: "conversationsAccess",
  initialState,
  reducers: {
    fetchJoinOneConversation(state, action: PayloadAction<string>) {
      const index = state.errorConversations.indexOf(action.payload);
      if (index !== -1) state.errorConversations.splice(index, 1);
      state.fetchingConversations.push(action.payload);
    },
    fetchLeaveOneConversation(state, action: PayloadAction<string>) {
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
      state.loadingState = LoadingConversationsAccessState.LOADING;
      state.errorConversations = [];
      state.fetchingConversations = action.payload;
    },
    errorJoinAllConversations(state, action: PayloadAction<string[]>) {
      state.fetchingConversations = [];
      state.errorConversations = action.payload;
    },
    setJoinConversationsLoadingState(
      state,
      action: PayloadAction<LoadingConversationsAccessState>
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
  fetchLeaveOneConversation,
  clearJoinConversationsState,
} = conversationsAccessSlice.actions;
export default conversationsAccessSlice.reducer;
