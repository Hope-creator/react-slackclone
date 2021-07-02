import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConversationsAccessState } from "./types";

const initialState = {
  fetchingConversations: [],
  errorConversations: [],
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
    successAccessOneConversation(state, action: PayloadAction<string>) {
      const index = state.fetchingConversations.indexOf(action.payload);
      if (index !== -1) state.fetchingConversations.splice(index, 1);
    },
    errorAccesOneConversation(state, action: PayloadAction<string>) {
      const index = state.fetchingConversations.indexOf(action.payload);
      if (index !== -1) state.fetchingConversations.splice(index, 1);
      state.errorConversations.push(action.payload);
    },
    clearJoinConversationsState() {
      return initialState;
    },
  },
});

export const {
  fetchJoinOneConversation,
  successAccessOneConversation,
  errorAccesOneConversation,
  fetchLeaveOneConversation,
  clearJoinConversationsState,
} = conversationsAccessSlice.actions;
export default conversationsAccessSlice.reducer;
