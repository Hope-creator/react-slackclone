import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/types";
import { ISideInfoMembersState, LoadingSideInfoMembersState } from "./types";

const initialState = {
  members: [],
  loadingState: LoadingSideInfoMembersState.NEVER,
} as ISideInfoMembersState;

const sideInfoMembersSlice = createSlice({
  name: "sideInfoMembers",
  initialState,
  reducers: {
    fetchSideInfoMembers(state, action: PayloadAction<string>) {
      state.loadingState = LoadingSideInfoMembersState.LOADING;
    },
    setSideInfoMembers(state, action: PayloadAction<IUser[]>) {
      state.members = action.payload;
      state.loadingState = LoadingSideInfoMembersState.LOADED;
    },
    setSideInfoMembersLoadingState(
      state,
      action: PayloadAction<LoadingSideInfoMembersState>
    ) {
      state.loadingState = action.payload;
    },
    clearSideInfoMebmers() {
      return initialState;
    },
  },
});

export const {
  fetchSideInfoMembers,
  setSideInfoMembers,
  setSideInfoMembersLoadingState,
  clearSideInfoMebmers,
} = sideInfoMembersSlice.actions;
export default sideInfoMembersSlice.reducer;
