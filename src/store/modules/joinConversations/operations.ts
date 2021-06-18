import { takeEvery, call, put } from "redux-saga/effects";
import { conversationsApi } from "../../../services/api/converastionsApi";
import {
  fetchJoinOneConversation,
  errorJoinOneConversation,
  setJoinConversationsLoadingState,
  fetchJoinAllConversations,
  errorJoinAllConversations,
  successJoinOneConversation,
  clearJoinConversationsState,
} from "./joinConversations";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoadingJoinConversationsState } from "./types";
import { addUserConversations } from "../user/user";

function* joinOneConversationsSaga(action: PayloadAction<string>) {
  try {
    const conversationIDs: string[] = yield call(
      conversationsApi.joinConversations,
      action.payload
    );
    yield put(addUserConversations(conversationIDs));
    yield put(successJoinOneConversation(action.payload));
  } catch (e) {
    yield put(errorJoinOneConversation(action.payload));
  }
}

function* joinAllConversationsSaga(action: PayloadAction<string[]>) {
  try {
    const conversationsIDs: string[] = yield call(
      conversationsApi.joinConversations
    );
    yield put(addUserConversations(conversationsIDs));
    yield put(clearJoinConversationsState());
  } catch (e) {
    yield put(
      setJoinConversationsLoadingState(LoadingJoinConversationsState.ERROR)
    );
    yield put(errorJoinAllConversations(action.payload));
  }
}

export function* joinConversationsSaga() {
  yield takeEvery(fetchJoinOneConversation.type, joinOneConversationsSaga);
  yield takeEvery(fetchJoinAllConversations.type, joinAllConversationsSaga);
}
