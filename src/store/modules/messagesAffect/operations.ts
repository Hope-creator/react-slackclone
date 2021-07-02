import { IMessage } from "../messages/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  fetchReadMessage,
  fetchDeleteMessage,
  setMessageAffectSuccess,
  setMessageAffectError,
  clearReadMessageState,
  setErrorMessages,
  fetchReadingAllMessagesUnread,
} from "./messagesAffect";
import { messagesApi } from "../../../services/api/messagesApi";
import {
  readedAllInStateUnread,
  readMessageInState,
} from "../messages/messages";

function* fetchReadMessageSaga(action: PayloadAction<string>) {
  try {
    yield call(messagesApi.readOneByMessageId, action.payload);
    yield put(setMessageAffectSuccess(action.payload));
    yield put(readMessageInState(action.payload));
  } catch (e) {
    console.log(e);
    yield put(setMessageAffectError(action.payload));
  }
}

function* fetchDeleteMessageSaga(action: PayloadAction<string>) {
  try {
    yield call(messagesApi.deleteMessage, action.payload);
    yield put(setMessageAffectSuccess(action.payload));
    yield put(readMessageInState(action.payload));
  } catch (e) {
    console.log(e);
    yield put(setMessageAffectError(action.payload));
  }
}

function* fetchReadAllMessagesUnreadSaga(action: PayloadAction<IMessage[]>) {
  try {
    yield call(messagesApi.readAll);
    yield put(readedAllInStateUnread());
    yield put(clearReadMessageState());
  } catch (e) {
    console.log(e);
    yield put(setErrorMessages(action.payload));
  }
}

export function* messagesAffectSaga() {
  yield takeEvery(fetchReadMessage.type, fetchReadMessageSaga);
  yield takeEvery(
    fetchReadingAllMessagesUnread.type,
    fetchReadAllMessagesUnreadSaga
  );
  yield takeEvery(fetchDeleteMessage.type, fetchDeleteMessageSaga);
}
