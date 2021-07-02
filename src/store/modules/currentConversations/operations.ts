import { takeEvery, call, put, select } from "redux-saga/effects";
import { LoadingCurrentConversationsState } from "./types";
import {
  setCurrentConversations,
  setCurrentConversationsLoadingState,
  fetchCurrentConversations,
  setPageCurrentConversations,
  setTotalCountCurrentConversations,
} from "./currentConversations";
import { IConversation } from "../conversations/types";
import { conversationsApi } from "../../../services/api/conversationsApi";
import { setLocalHistoryItem } from "../../../functions/setLocalHistoryItem";
import { LocalHistoryItemType, PathesCustomNames } from "../../../constants";
import { IPaginationData } from "../../../services/api/types";
import {
  selectCurrentConversationsSearchName,
  selectCurrentConversationsPage,
  selectCurrentConversationsCount,
} from "./selectors";

function* fetchCurrentConversationsSaga() {
  try {
    const searchName: string = yield select(
      selectCurrentConversationsSearchName
    );
    const page: number = yield select(selectCurrentConversationsPage);
    const count: number = yield select(selectCurrentConversationsCount);
    const data: IPaginationData<IConversation[]> = yield call(
      conversationsApi.fetchConversations,
      searchName,
      page + 1,
      count
    );
    yield put(setTotalCountCurrentConversations(data.totalCount || 0));
    yield put(setPageCurrentConversations(page + 1));
    yield put(setCurrentConversations(data.results));
    yield put(
      setCurrentConversationsLoadingState(
        LoadingCurrentConversationsState.LOADED
      )
    );
    setLocalHistoryItem(
      PathesCustomNames.CHANNEL_BROWSER,
      LocalHistoryItemType.CUSTOM
    );
  } catch (e) {
    console.log(e);

    yield put(
      setCurrentConversationsLoadingState(
        LoadingCurrentConversationsState.ERROR
      )
    );
  }
}

export function* currentConversationsSaga() {
  yield takeEvery(
    fetchCurrentConversations.type,
    fetchCurrentConversationsSaga
  );
}
