import { takeEvery, call, put } from "redux-saga/effects";
import { LoadingCurrentInfoState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { IConversation } from "../conversations/types";
import { conversationsApi } from "../../../services/api/converastionsApi";
import {
  fetchCurrentInfoChannel,
  fetchCurrentInfoProfile,
  setCurrentInfoChannel,
  setCurrentInfoLoadingState,
  setCurrentInfoProfile,
} from "./currentInfo";
import { IUser } from "../user/types";
import { userApi } from "../../../services/api/userApi";

function* fetchCurrentInfoChannelSaga(action: PayloadAction<string>) {
  try {
    const conversation: IConversation = yield call(
      conversationsApi.fetchConversationWithPopulate,
      action.payload
    );
    yield put(setCurrentInfoChannel(conversation));
    yield put(setCurrentInfoLoadingState(LoadingCurrentInfoState.LOADED));
  } catch (e) {
    yield put(setCurrentInfoLoadingState(LoadingCurrentInfoState.ERROR));
  }
}

function* fetchCurrentInfoProfileSaga(action: PayloadAction<string>) {
  try {
    const user: IUser = yield call(userApi.getUser, action.payload);
    yield put(setCurrentInfoProfile(user));
    yield put(setCurrentInfoLoadingState(LoadingCurrentInfoState.LOADED));
  } catch (e) {
    yield put(setCurrentInfoLoadingState(LoadingCurrentInfoState.ERROR));
  }
}

export function* currentInfoSaga() {
  yield takeEvery(fetchCurrentInfoChannel.type, fetchCurrentInfoChannelSaga);
  yield takeEvery(fetchCurrentInfoProfile.type, fetchCurrentInfoProfileSaga);
}
