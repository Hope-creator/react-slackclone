import { takeEvery, call, put } from "redux-saga/effects";
import { IConversation, LoadingConversationsState } from "./types";
import { conversationsApi } from "../../../services/api/converastionsApi";
import {
  fetchConversations,
  joinAllConversations,
  setConversations,
  setConversationsLoadingState,
  addOneConversation,
  joinOneConversation,
} from "./conversations";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchConversationsSaga() {
  try {
    const conversations: IConversation[] | [] = yield call(
      conversationsApi.fetchConversations
    );
    yield put(setConversations(conversations));
  } catch (e) {
    yield put(setConversationsLoadingState(LoadingConversationsState.ERROR));
  }
}

function* joinOneConversationsSaga(action: PayloadAction<string>) {
  try {
    const conversation: IConversation = yield call(
      conversationsApi.joinConversations,
      action.payload
    );
    yield put(addOneConversation(conversation));
  } catch (e) {
    yield put(setConversationsLoadingState(LoadingConversationsState.ERROR));
  }
}

function* joinAllConversationsSaga() {
  try {
    const conversations: IConversation[] | [] = yield call(
      conversationsApi.joinConversations
    );
    yield put(setConversations(conversations));
  } catch (e) {
    yield put(setConversationsLoadingState(LoadingConversationsState.ERROR));
  }
}

export function* conversationsSaga() {
  yield takeEvery(fetchConversations.type, fetchConversationsSaga);
  yield takeEvery(joinAllConversations.type, joinAllConversationsSaga);
  yield takeEvery(joinOneConversation.type, joinOneConversationsSaga);
}
