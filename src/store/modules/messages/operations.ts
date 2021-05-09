import { takeEvery, call, put } from "redux-saga/effects";
import { IMessage, LoadingMessagesState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchMessages,
  setMessages,
  setMessagesLoadingState,
} from "./messages";
import { messagesApi } from "../../../services/api/messagesApi";

function* fetchMessagesSaga(action: PayloadAction<string>) {
  try {
    const messages: IMessage[] | [] = yield call(
      messagesApi.fetchMessages,
      action.payload
    );
    yield put(setMessages(messages));
  } catch (e) {
    yield put(setMessagesLoadingState(LoadingMessagesState.ERROR));
  }
}

export function* messagesSaga() {
  yield takeEvery(fetchMessages.type, fetchMessagesSaga);
}
