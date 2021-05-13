import { takeEvery, call, put } from "redux-saga/effects";
import { IMessage, LoadingCurrentConversationState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setCurrentConversation,
  setMessages,
  setCurrentConversationLoadingState,
  fetchCurrentConversation,
} from "./currentConversation";
import { messagesApi } from "../../../services/api/messagesApi";
import { IConversation } from "../conversations/types";
import { conversationsApi } from "../../../services/api/converastionsApi";

function* fetchCurrentConversationSaga(action: PayloadAction<string>) {
  try {
    const conversation: IConversation = yield call(
      conversationsApi.fetchCurrentConversation,
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

export function* currentConversationSaga() {
  yield takeEvery(fetchCurrentConversation.type, fetchCurrentConversationSaga);
}
