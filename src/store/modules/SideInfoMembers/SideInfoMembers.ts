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
    addOneSideInfoMembers(state, action: PayloadAction<IUser>) {
      state.members = [action.payload, ...state.members];
    },
    updateOneSideInfoMembers(state, action: PayloadAction<IUser>) {
      const index = state.members.findIndex(
        (member) => member._id === action.payload._id
      );
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    deleteOneSideInfoMembers(state, action: PayloadAction<IUser>) {
      const index = state.members.findIndex(
        (member) => member._id === action.payload._id
      );
      if (index !== -1) {
        state.members.splice(index, 1);
      }
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
  addOneSideInfoMembers,
  updateOneSideInfoMembers,
  deleteOneSideInfoMembers,
  clearSideInfoMebmers,
} = sideInfoMembersSlice.actions;
export default sideInfoMembersSlice.reducer;
