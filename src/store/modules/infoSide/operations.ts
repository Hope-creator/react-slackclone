import { takeEvery, call, put } from "redux-saga/effects";
import { LoadingInfoSideState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { IConversation } from "../conversations/types";
import { conversationsApi } from "../../../services/api/conversationsApi";
import {
  fetchInfoSideChannel,
  fetchInfoSideProfile,
  setInfoSideChannel,
  setInfoSideLoadingState,
  setInfoSideProfile,
} from "./infoSide";
import { IUser } from "../user/types";
import { userApi } from "../../../services/api/userApi";

function* fetchInfoSideChannelSaga(action: PayloadAction<string>) {
  try {
    const conversation: IConversation = yield call(
      conversationsApi.fetchConversation,
      action.payload
    );
    yield put(setInfoSideChannel(conversation));
    yield put(setInfoSideLoadingState(LoadingInfoSideState.LOADED));
  } catch (e) {
    yield put(setInfoSideLoadingState(LoadingInfoSideState.ERROR));
  }
}

function* fetchInfoSideProfileSaga(action: PayloadAction<string>) {
  try {
    const user: IUser = yield call(userApi.getUser, action.payload);
    yield put(setInfoSideProfile(user));
    yield put(setInfoSideLoadingState(LoadingInfoSideState.LOADED));
  } catch (e) {
    yield put(setInfoSideLoadingState(LoadingInfoSideState.ERROR));
  }
}

export function* infoSideSaga() {
  yield takeEvery(fetchInfoSideChannel.type, fetchInfoSideChannelSaga);
  yield takeEvery(fetchInfoSideProfile.type, fetchInfoSideProfileSaga);
}
