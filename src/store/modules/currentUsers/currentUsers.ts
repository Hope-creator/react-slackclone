import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/types";
import { ICurrentUsersState, LoadingCurrentUsersState } from "./types";

const initialState = {
  users: [],
  searchName: "",
  page: 0,
  count: 10,
  totalCount: 10,
  loadingState: "NEVER",
} as ICurrentUsersState;

const currentConversationSlicer = createSlice({
  name: "currentUsers",
  initialState,
  reducers: {
    fetchCurrentUsers(state) {
      state.loadingState = LoadingCurrentUsersState.LOADING;
    },
    setCurrentUsersLoadingState(
      state,
      action: PayloadAction<LoadingCurrentUsersState>
    ) {
      state.loadingState = action.payload;
    },
    setCurrentUsers(state, action: PayloadAction<IUser[] | []>) {
      state.users = [...state.users, ...action.payload];
    },
    updateOneCurrentUsers(state, action: PayloadAction<IUser>) {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    setCurrentUsersSearchName(state, action: PayloadAction<string>) {
      state.loadingState = LoadingCurrentUsersState.LOADING;
      state.users = [];
      state.page = 0;
      state.searchName = action.payload;
    },
    setPageCurrentUsers(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCountCurrentUsers(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setTotalCountCurrentUsers(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    addOneCurrentUsers(state, action: PayloadAction<IUser>) {
      state.users.push(action.payload);
      state.users.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
    clearCurrentUsers() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentUsers,
  setCurrentUsersLoadingState,
  setCurrentUsers,
  addOneCurrentUsers,
  setPageCurrentUsers,
  updateOneCurrentUsers,
  setCurrentUsersSearchName,
  setCountCurrentUsers,
  setTotalCountCurrentUsers,
  clearCurrentUsers,
} = currentConversationSlicer.actions;
export default currentConversationSlicer.reducer;
