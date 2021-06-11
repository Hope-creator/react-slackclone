import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/types";
import {
  IConversationMembersState,
  LoadingConversationsMembersState,
} from "./types";

const initialState = {
  members: [],
  loadingState: LoadingConversationsMembersState.NEVER,
} as IConversationMembersState;

const conversationMembersSlice = createSlice({
  name: "ConversationMembers",
  initialState,
  reducers: {
    fetchConverastionMembers(state, action: PayloadAction<string>) {
      state.loadingState = LoadingConversationsMembersState.LOADING;
    },
    setConverastionMembers(state, action: PayloadAction<IUser[]>) {
      state.members = action.payload;
      state.loadingState = LoadingConversationsMembersState.LOADED;
    },
    setConverastionMembersLoadingState(
      state,
      action: PayloadAction<LoadingConversationsMembersState>
    ) {
      state.loadingState = action.payload;
    },
    clearConversationMembers() {
      return initialState;
    },
  },
});

export const {
  fetchConverastionMembers,
  setConverastionMembers,
  setConverastionMembersLoadingState,
  clearConversationMembers,
} = conversationMembersSlice.actions;
export default conversationMembersSlice.reducer;
