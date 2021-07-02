import { IUser, IUserState, LoadingUserState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginForm } from "./../../../components/SignInForm";
import { IGetStartedForm } from "../../../components/GetStartedForm";
import { IEditProfileForm } from "../../../components/EditProfileModal";

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
    updateProfile(state, action: PayloadAction<IEditProfileForm>) {
      state.loadingState = LoadingUserState.LOADINGUPDATE;
    },
    updateAvatar(state, action: PayloadAction<FormData>) {
      state.loadingState = LoadingUserState.LOADINGUPDATE;
    },
    updateIsAway(state, action: PayloadAction<boolean>) {
      state.loadingState = LoadingUserState.LOADINGUPDATE;
    },
    removeAvatar(state) {
      state.loadingState = LoadingUserState.LOADINGUPDATE;
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
    addUserConversation(state, action: PayloadAction<string>) {
      if (state.user) state.user.conversations.push(action.payload);
    },
    deleteUserConversation(state, action: PayloadAction<string>) {
      if (state.user) {
        const index = state.user.conversations.findIndex(
          (convId) => convId === action.payload
        );
        if (index !== -1) {
          state.user.conversations.splice(index);
        }
      }
    },
    removeUserConversation(state, action: PayloadAction<string>) {
      if (state.user) {
        const index = state.user.conversations.findIndex(
          (conv) => conv === action.payload
        );
        if (index !== -1) {
          state.user.conversations.splice(index, 1);
        }
      }
    },
    logoutUser() {},
    clearUserState() {
      return initialState;
    },
  },
});

export const {
  fetchUser,
  setUser,
  removeAvatar,
  setUserLoadingState,
  fetchMe,
  updateProfile,
  updateAvatar,
  updateIsAway,
  createUser,
  addUserConversation,
  deleteUserConversation,
  removeUserConversation,
  logoutUser,
  clearUserState,
} = userSlice.actions;
export default userSlice.reducer;
