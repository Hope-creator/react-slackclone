import { takeEvery, call, put } from "redux-saga/effects";
import { IConversation, LoadingConversationsState } from "./types";
import { conversationsApi } from "../../../services/api/converastionsApi";
import {
  fetchConversations,
  joinAllConversations,
  setConversations,
  setConversationsLoadingState,
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

function* joinAllConversationsSaga() {
  try {
    const conversations: IConversation[] | [] = yield call(
      conversationsApi.joinAllConversations
    );
    yield put(setConversations(conversations));
  } catch (e) {
    yield put(setConversationsLoadingState(LoadingConversationsState.ERROR));
  }
}

export function* conversationsSaga() {
  yield takeEvery(fetchConversations.type, fetchConversationsSaga);
  yield takeEvery(joinAllConversations.type, joinAllConversationsSaga);
}
