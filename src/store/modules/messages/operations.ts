import { takeEvery, call, put, select } from "redux-saga/effects";
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
  fetchMessagesMarked,
  fetchMessagesDialog,
  sendNewDirectMessage,
  setPageMessages,
  setTotalCountMessages,
} from "./messages";
import { messagesApi } from "../../../services/api/messagesApi";
import { ISendMessageForm } from "../../../components/SendMessageForm";
import { setLocalHistoryItem } from "../../../functions/setLocalHistoryItem";
import { LocalHistoryItemType, PathesCustomNames } from "../../../constants";
import { selectMessagesCount, selectMessagesPage } from "./selectors";
import { IPaginationData } from "../../../services/api/types";

function* fetchMessagesConversationSaga(action: PayloadAction<string>) {
  try {
    const page: number = yield select(selectMessagesPage);
    const count: number = yield select(selectMessagesCount);
    const data: IPaginationData<IMessage[] | []> = yield call(
      messagesApi.fetchMessages,
      action.payload,
      page + 1,
      count
    );
    yield put(setTotalCountMessages(data.totalCount || 0));
    yield put(setMessages(data.results));
    yield put(setPageMessages(page + 1));
    yield put(setMessagesLoadingState(LoadingMessagesState.LOADED));
  } catch (e) {
    yield put(setMessagesLoadingState(LoadingMessagesState.ERROR));
  }
}

function* fetchMessagesDialogSaga(action: PayloadAction<string>) {
  try {
    const page: number = yield select(selectMessagesPage);
    const count: number = yield select(selectMessagesCount);
    const data: IPaginationData<IMessage[] | []> = yield call(
      messagesApi.fetchDirectMessages,
      action.payload,
      page + 1,
      count
    );
    yield put(setTotalCountMessages(data.totalCount || 0));
    yield put(setMessages(data.results));
    yield put(setPageMessages(page + 1));
    yield put(setMessagesLoadingState(LoadingMessagesState.LOADED));
  } catch (e) {
    yield put(setMessagesLoadingState(LoadingMessagesState.ERROR));
  }
}

function* fetchMessagesUnreadSaga() {
  try {
    const page: number = yield select(selectMessagesPage);
    const count: number = yield select(selectMessagesCount);
    const data: IPaginationData<IMessage[] | []> = yield call(
      messagesApi.getAllUnread,
      page + 1,
      count
    );
    yield put(setTotalCountMessages(data.totalCount || 0));
    yield put(setMessages(data.results));
    yield put(setPageMessages(page + 1));
    yield put(setMessagesLoadingState(LoadingMessagesState.LOADED));
    setLocalHistoryItem(
      PathesCustomNames.ALLUNREADS,
      LocalHistoryItemType.CUSTOM
    );
  } catch (e) {
    yield put(setMessagesLoadingState(LoadingMessagesState.ERROR));
  }
}

function* fetchMessagesMarkedSaga() {
  try {
    const page: number = yield select(selectMessagesPage);
    const count: number = yield select(selectMessagesCount);
    const data: IPaginationData<IMessage[] | []> = yield call(
      messagesApi.getMarkMessages,
      page + 1,
      count
    );
    yield put(setTotalCountMessages(data.totalCount || 0));
    yield put(setMessages(data.results));
    yield put(setPageMessages(page + 1));
    yield put(setMessagesLoadingState(LoadingMessagesState.LOADED));
    setLocalHistoryItem(
      PathesCustomNames.SAVED_ITEMS,
      LocalHistoryItemType.CUSTOM
    );
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

function* sendDirectMessageSaga(action: PayloadAction<ISendMessageForm>) {
  try {
    yield call(messagesApi.sendDirectMessage, action.payload);
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
  yield takeEvery(fetchMessagesMarked.type, fetchMessagesMarkedSaga);
  yield takeEvery(sendNewMessage.type, sendMessageSaga);
  yield takeEvery(sendNewDirectMessage.type, sendDirectMessageSaga);
  yield takeEvery(markMessage.type, markMessageSaga);
  yield takeEvery(unmarkMessage.type, unmarkMessageSaga);
  yield takeEvery(fetchMessagesDialog.type, fetchMessagesDialogSaga);
}
