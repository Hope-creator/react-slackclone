import { takeEvery, call, put, select } from "redux-saga/effects";
import { IConversation, LoadingConversationsState } from "./types";
import { conversationsApi } from "../../../services/api/conversationsApi";
import {
  fetchConversations,
  setConversations,
  setConversationsLoadingState,
  setPageConversations,
  setTotalCountConversations,
} from "./conversations";
import { IPaginationData } from "../../../services/api/types";
import { selectConversationsCount, selectConversationsPage } from "./selectors";

function* fetchConversationsSaga() {
  try {
    const page: number = yield select(selectConversationsPage);
    const count: number = yield select(selectConversationsCount);

    const data: IPaginationData<IConversation[] | []> = yield call(
      conversationsApi.fetchConversations,
      "",
      page + 1,
      count
    );
    yield put(setTotalCountConversations(data.totalCount || 0));
    yield put(setPageConversations(page + 1));
    yield put(setConversations(data.results));
    yield put(setConversationsLoadingState(LoadingConversationsState.LOADED));
  } catch (e) {
    yield put(setConversationsLoadingState(LoadingConversationsState.ERROR));
  }
}

export function* conversationsSaga() {
  yield takeEvery(fetchConversations.type, fetchConversationsSaga);
}
