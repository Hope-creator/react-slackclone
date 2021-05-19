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
      state.loadingState = LoadingUserState.LOADING;
    },
    createUser(state, action: PayloadAction<IGetStartedForm>) {
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

export const { fetchUser, setUser, setUserLoadingState, fetchMe, createUser } =
  userSlice.actions;
export default userSlice.reducer;
