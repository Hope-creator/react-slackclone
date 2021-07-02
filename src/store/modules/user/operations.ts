import { ILoginForm } from "./../../../components/SignInForm";
import { takeLatest, call, put } from "redux-saga/effects";
import { IUser, LoadingUserState } from "./types";
import {
  fetchMe,
  fetchUser,
  setUser,
  setUserLoadingState,
  createUser,
  updateProfile,
  updateAvatar,
  removeAvatar,
  updateIsAway,
  logoutUser,
  clearUserState,
} from "./user";
import { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../../services/api/authApi";
import { IGetStartedForm } from "../../../components/GetStartedForm";
import { IEditProfileForm } from "../../../components/EditProfileModal";
import { uploadApi } from "../../../services/api/uploadApi";
import socket from "../../../services/socket/socket";

function* fetchMeSaga() {
  try {
    const user: IUser = yield call(authApi.getMe);
    yield put(setUser(user));
  } catch (e) {
    if (e.message.includes("401")) {
      yield put(setUserLoadingState(LoadingUserState.LOADED));
    } else {
      yield put(setUserLoadingState(LoadingUserState.ERROR));
    }
  }
}

function* fetchUserSaga(action: PayloadAction<ILoginForm>) {
  try {
    const user: IUser = yield call(authApi.signIn, action.payload);
    yield put(setUser(user));
    yield put(setUserLoadingState(LoadingUserState.LOADED));
  } catch (e) {
    yield put(setUserLoadingState(LoadingUserState.ERRORLOGIN));
  }
}

function* updateProfileSaga(action: PayloadAction<IEditProfileForm>) {
  try {
    const user: IUser = yield call(authApi.updateProfile, action.payload);
    yield put(setUser(user));
    setUserLoadingState(LoadingUserState.LOADED);
  } catch (e) {
    yield put(setUserLoadingState(LoadingUserState.ERRORUPDATE));
  }
}

function* updateProfileAvatarSaga(action: PayloadAction<FormData>) {
  try {
    const avatarSrc: string = yield call(
      uploadApi.uploadAvatar,
      action.payload
    );
    const user: IUser = yield call(authApi.updateAvatar, avatarSrc);
    yield put(setUser(user));
    setUserLoadingState(LoadingUserState.LOADED);
  } catch (e) {
    yield put(setUserLoadingState(LoadingUserState.ERRORUPDATE));
  }
}

function* updateProfileIsAwaySaga(action: PayloadAction<boolean>) {
  try {
    const user: IUser = yield call(authApi.updateIsAway, action.payload);
    yield put(setUser(user));
    setUserLoadingState(LoadingUserState.LOADED);
  } catch (e) {
    yield put(setUserLoadingState(LoadingUserState.ERRORUPDATE));
  }
}

function* removeProfileAvatarSaga() {
  try {
    const user: IUser = yield call(authApi.updateAvatar, "");
    yield put(setUser(user));
    setUserLoadingState(LoadingUserState.LOADED);
  } catch (e) {
    yield put(setUserLoadingState(LoadingUserState.ERRORUPDATE));
  }
}

function* createUserSaga(action: PayloadAction<IGetStartedForm>) {
  try {
    const user: IUser = yield call(authApi.signUp, action.payload);
    yield put(setUser(user));
  } catch (e) {
    if (e.message.match("409"))
      yield put(setUserLoadingState(LoadingUserState.ERROREMAIL));
    else {
      yield put(setUserLoadingState(LoadingUserState.ERROR));
    }
  }
}

function* logoutUserSaga() {
  try {
    const isLoggedOut: boolean = yield call(authApi.logout);
    if (isLoggedOut) {
      socket.disconnect();
      yield put(clearUserState());
    }
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(fetchUser.type, fetchUserSaga);
  yield takeLatest(fetchMe.type, fetchMeSaga);
  yield takeLatest(createUser.type, createUserSaga);
  yield takeLatest(updateProfile.type, updateProfileSaga);
  yield takeLatest(updateAvatar.type, updateProfileAvatarSaga);
  yield takeLatest(removeAvatar.type, removeProfileAvatarSaga);
  yield takeLatest(updateIsAway.type, updateProfileIsAwaySaga);
  yield takeLatest(logoutUser.type, logoutUserSaga);
}
