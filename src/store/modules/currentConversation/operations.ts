import { takeEvery, call, put } from "redux-saga/effects";
import {
  IMessage,
  LoadingCurrentConversationState,
  LoadingSendMessageState,
} from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setCurrentConversation,
  setMessages,
  setCurrentConversationLoadingState,
  fetchCurrentConversation,
  sendNewMessage,
  setSendNewMessageState,
  markMessage,
  markMessageInState,
  unmarkMessage,
  unmarkMessageInState,
} from "./currentConversation";
import { messagesApi } from "../../../services/api/messagesApi";
import { IConversation } from "../conversations/types";
import { conversationsApi } from "../../../services/api/converastionsApi";
import { ISendMessageForm } from "../../../components/SendMessageForm";

function* fetchCurrentConversationSaga(action: PayloadAction<string>) {
  try {
    const conversation: IConversation = yield call(
      conversationsApi.fetchConversationWithPopulate,
      action.payload
    );
    const messages: IMessage[] | [] = yield call(
      messagesApi.fetchMessages,
      action.payload
    );
    yield put(setCurrentConversation(conversation));
    yield put(setMessages(messages));
    yield put(
      setCurrentConversationLoadingState(LoadingCurrentConversationState.LOADED)
    );
  } catch (e) {
    yield put(
      setCurrentConversationLoadingState(LoadingCurrentConversationState.ERROR)
    );
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

export function* currentConversationSaga() {
  yield takeEvery(fetchCurrentConversation.type, fetchCurrentConversationSaga);
  yield takeEvery(sendNewMessage.type, sendMessageSaga);
  yield takeEvery(markMessage.type, markMessageSaga);
  yield takeEvery(unmarkMessage.type, unmarkMessageSaga);
}
