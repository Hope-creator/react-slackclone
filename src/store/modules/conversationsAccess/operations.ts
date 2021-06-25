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
  fetchLeaveOneConversation,
} from "./conversationsAccess";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoadingConversationsAccessState } from "./types";
import { addUserConversations, removeUserConversation } from "../user/user";

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

function* leaveConversationSaga(action: PayloadAction<string>) {
  try {
    const leave: boolean = yield call(conversationsApi.leave, action.payload);
    if (leave) {
      yield put(removeUserConversation(action.payload));
      yield put(successJoinOneConversation(action.payload));
    }
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
      setJoinConversationsLoadingState(LoadingConversationsAccessState.ERROR)
    );
    yield put(errorJoinAllConversations(action.payload));
  }
}

export function* conversationsAccessSaga() {
  yield takeEvery(fetchJoinOneConversation.type, joinOneConversationsSaga);
  yield takeEvery(fetchJoinAllConversations.type, joinAllConversationsSaga);
  yield takeEvery(fetchLeaveOneConversation.type, leaveConversationSaga);
}
