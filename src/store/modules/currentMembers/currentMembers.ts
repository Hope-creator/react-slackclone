import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/types";
import { ICurrentMembersState, LoadingCurrentMembersState } from "./types";

const initialState = {
  members: [],
  loadingState: "NEVER",
} as ICurrentMembersState;

const currentConversationSlicer = createSlice({
  name: "currentMembers",
  initialState,
  reducers: {
    fetchCurrentMembers(state) {
      state.loadingState = LoadingCurrentMembersState.LOADING;
    },
    setCurrentMembersLoadingState(
      state,
      action: PayloadAction<LoadingCurrentMembersState>
    ) {
      state.loadingState = action.payload;
    },
    setCurrentMembers(state, action: PayloadAction<IUser[] | []>) {
      state.members = [...action.payload];
    },
    clearCurrentMembers() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentMembers,
  setCurrentMembersLoadingState,
  setCurrentMembers,
  clearCurrentMembers,
} = currentConversationSlicer.actions;
export default currentConversationSlicer.reducer;
