import { IUser, IUserState, LoadingUserState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginForm } from "./../../../components/SignInForm";
import { IGetStartedForm } from "../../../components/GetStartedForm";

const initialState = { user: null, loadingState: "NEVER" } as IUserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchMe(state) {
      state.loadingState = LoadingUserState.LOADING;
    },
    fetchUser(state, action: PayloadAction<ILoginForm>) {
      state.loadingState = LoadingUserState.LOADINGLOGIN;
    },
    createUser(state, action: PayloadAction<IGetStartedForm>) {
      state.loadingState = LoadingUserState.LOADINGCREATE;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.loadingState = LoadingUserState.LOADED;
    },
    setUserLoadingState(state, action: PayloadAction<LoadingUserState>) {
      state.loadingState = action.payload;
    },
    addUserConversations(state, action: PayloadAction<string[]>) {
      if (state.user) state.user.conversations = action.payload;
    },
    clearUserState() {
      return initialState;
    },
  },
});

export const {
  fetchUser,
  setUser,
  setUserLoadingState,
  fetchMe,
  createUser,
  addUserConversations,
  clearUserState,
} = userSlice.actions;
export default userSlice.reducer;
