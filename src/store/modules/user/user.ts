import { IUser, IUserState, LoadingUserState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "redux";

const initialState = { user: null, loadingState: "NEVER" } as IUserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser(state) {
      state.loadingState = LoadingUserState.LOADING;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.loadingState = LoadingUserState.LOADED;
    },
    setUserLoadingState(state, action: PayloadAction<LoadingUserState>) {
      state.loadingState = action.payload;
    },
  },
});

export const { fetchUser, setUser, setUserLoadingState } = userSlice.actions;
export default userSlice.reducer;
