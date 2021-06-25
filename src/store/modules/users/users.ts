import { LoadingUsersState, IUsersState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/types";

const initialState = {
  users: [],
  page: 0,
  count: 20,
  totalCount: 20,
  loadingState: "NEVER",
} as IUsersState;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsers(state) {
      state.loadingState = LoadingUsersState.LOADING;
    },
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = [...state.users,...action.payload];
    },
    setPageUsers(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCountUsers(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setTotalCountUsers(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    addUser(state, action: PayloadAction<IUser>) {
      state.users.unshift(action.payload);
    },
    setUsersLoadingState(state, action: PayloadAction<LoadingUsersState>) {
      state.loadingState = action.payload;
    },
    clearUsersState() {
      return initialState;
    },
  },
});

export const {
  fetchUsers,
  setUsers,
  addUser,
  setUsersLoadingState,
  setCountUsers,
  clearUsersState,
  setPageUsers,
setTotalCountUsers
} = usersSlice.actions;
export default usersSlice.reducer;
