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
    fetchConversationMembers(state, action: PayloadAction<string>) {
      state.loadingState = LoadingConversationsMembersState.LOADING;
    },
    setConversationMembers(state, action: PayloadAction<IUser[]>) {
      state.members = action.payload;
      state.loadingState = LoadingConversationsMembersState.LOADED;
    },
    addOneConversationMembers(state, action: PayloadAction<IUser>) {
      state.members = [action.payload, ...state.members];
    },
    updateOneConversationMembers(state, action: PayloadAction<IUser>) {
      const index = state.members.findIndex(
        (member) => member._id === action.payload._id
      );
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    deleteOneConversationMembers(state, action: PayloadAction<IUser>) {
      const index = state.members.findIndex(
        (member) => member._id === action.payload._id
      );
      if (index !== -1) {
        state.members.splice(index, 1);
      }
    },
    setConversationMembersLoadingState(
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
  fetchConversationMembers,
  setConversationMembers,
  setConversationMembersLoadingState,
  addOneConversationMembers,
  updateOneConversationMembers,
  deleteOneConversationMembers,
  clearConversationMembers,
} = conversationMembersSlice.actions;
export default conversationMembersSlice.reducer;
