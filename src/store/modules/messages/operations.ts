import { takeEvery, call, put } from "redux-saga/effects";
import {
  IMessage,
  LoadingMessagesState,
  LoadingSendMessageState,
} from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setMessages,
  sendNewMessage,
  setSendNewMessageState,
  markMessage,
  markMessageInState,
  unmarkMessage,
  unmarkMessageInState,
  setMessagesLoadingState,
  fetchMessagesConversation,
  fetchMessagesUnread,
} from "./messages";
import { messagesApi } from "../../../services/api/messagesApi";
import { ISendMessageForm } from "../../../components/SendMessageForm";

function* fetchMessagesConversationSaga(action: PayloadAction<string>) {
  try {
    const messages: IMessage[] | [] = yield call(
      messagesApi.fetchMessages,
      action.payload
    );
    yield put(setMessages(messages));
    yield put(setMessagesLoadingState(LoadingMessagesState.LOADED));
  } catch (e) {
    yield put(setMessagesLoadingState(LoadingMessagesState.ERROR));
  }
}

function* fetchMessagesUnreadSaga() {
  try {
    const messages: IMessage[] | [] = yield call(messagesApi.getAllUnread);
    yield put(setMessages(messages));
    yield put(setMessagesLoadingState(LoadingMessagesState.LOADED));
  } catch (e) {
    yield put(setMessagesLoadingState(LoadingMessagesState.ERROR));
  }
}

function* sendMessageSaga(action: PayloadAction<ISendMessageForm>) {
  try {
    yield call(messagesApi.sendMessage, action.payload);
    yield put(setSendNewMessageState(LoadingSendMessageState.LOADED));
  } catch (e) {
    yield put(setSendNewMessageState(LoadingSendMessageState.ERROR));
  }
}

function* markMessageSaga(action: PayloadAction<string>) {
  try {
    const mark: boolean = yield call(messagesApi.markMessage, action.payload);
    if (mark) {
      yield put(markMessageInState(action.payload));
    }
  } catch (e) {
    console.log(e);
  }
}

function* unmarkMessageSaga(action: PayloadAction<string>) {
  try {
    const unmark: boolean = yield call(
      messagesApi.unmarkMessage,
      action.payload
    );
    if (unmark) {
      yield put(unmarkMessageInState(action.payload));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* messagesSaga() {
  yield takeEvery(
    fetchMessagesConversation.type,
    fetchMessagesConversationSaga
  );
  yield takeEvery(fetchMessagesUnread.type, fetchMessagesUnreadSaga);

  yield takeEvery(sendNewMessage.type, sendMessageSaga);
  yield takeEvery(markMessage.type, markMessageSaga);
  yield takeEvery(unmarkMessage.type, unmarkMessageSaga);
}
