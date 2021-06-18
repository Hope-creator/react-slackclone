import { ILoginForm } from "./../../../components/SignInForm";
import { takeEvery, call, put } from "redux-saga/effects";
import { IUser, LoadingUserState } from "./types";
import {
  fetchMe,
  fetchUser,
  setUser,
  setUserLoadingState,
  createUser,
} from "./user";
import { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../../services/api/authApi";
import { IGetStartedForm } from "../../../components/GetStartedForm";

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
  } catch (e) {
    yield put(setUserLoadingState(LoadingUserState.ERRORLOGIN));
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

export function* userSaga() {
  yield takeEvery(fetchUser.type, fetchUserSaga);
  yield takeEvery(fetchMe.type, fetchMeSaga);
  yield takeEvery(createUser.type, createUserSaga);
}
