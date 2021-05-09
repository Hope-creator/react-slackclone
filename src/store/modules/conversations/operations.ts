import { takeEvery, call, put } from "redux-saga/effects";
import { IConversation, LoadingConversationsState } from "./types";
import { conversationsApi } from "../../../services/api/converastionsApi";
import {
  fetchConverastions,
  setConversations,
  setConversationsLoadingState,
  fetchCurrentConversation
} from "./conversations";

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

function* fetchCurrentConversationSaga() {
  try {
    const conversation: IConversation = yield call(
      conversationsApi.fetchConversations
    );
    yield put(setConversations(conversations));
  } catch (e) {
    yield put(setConversationsLoadingState(LoadingConversationsState.ERROR));
  }
}

export function* conversationsSaga() {
  yield takeEvery(fetchConverastions.type, fetchConversationsSaga);
  yield takeEvery(fetchCurrentConversation.type, fetchCurrentConversationSaga);
}
