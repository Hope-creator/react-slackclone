import { IUser } from "./../user/types";
import { IConversation } from "./../conversations/types";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { LoadingSearchState } from "./types";
import {
  fetchSearchConversations,
  fetchSearchUsers,
  setResultsUsers,
  setSearchLoadingState,
  setTotalCountSearchUsers,
  setTotalCountSearchConversations,
  setResultsConversations,
  setPageSearchUsers,
  setPageSearchConversations,
} from "./search";
import { conversationsApi } from "../../../services/api/conversationsApi";
import { userApi } from "../../../services/api/userApi";
import {
  selectSearch,
  selectSearchCount,
  selectSearchPageConversations,
  selectSearchPageUsers,
  selectSearchTotalCountConversations,
  selectSearchTotalCountUsers,
} from "./selectors";
import { IPaginationData } from "../../../services/api/types";

function* fetchSearchConversationsSaga() {
  try {
    const page: number = yield select(selectSearchPageConversations);
    const count: number = yield select(selectSearchCount);
    const totalCountConversations: number = yield select(
      selectSearchTotalCountConversations
    );
    const searchName: string = yield select(selectSearch);

    if (page * count < totalCountConversations) {
      const data: IPaginationData<IConversation[]> = yield call(
        conversationsApi.fetchConversations,
        searchName,
        page,
        count
      );
      yield put(setResultsConversations(data.results));
      yield put(setTotalCountSearchConversations(data.totalCount || 0));
    }
    yield put(setPageSearchConversations(page + 1));
    yield put(setSearchLoadingState(LoadingSearchState.LOADED));
  } catch (e) {
    yield put(setSearchLoadingState(LoadingSearchState.ERROR));
  }
}

function* fetchSearchUsersSaga() {
  try {
    const page: number = yield select(selectSearchPageUsers);
    const count: number = yield select(selectSearchCount);
    const totalCount: number = yield select(selectSearchTotalCountUsers);
    const searchName: string = yield select(selectSearch);
    if (page * count < totalCount) {
      const data: IPaginationData<IUser[]> = yield call(
        userApi.getAllUsers,
        searchName,
        page,
        count
      );
      yield put(setResultsUsers(data.results));
      yield put(setTotalCountSearchUsers(data.totalCount || 0));
      yield put(setPageSearchUsers(page + 1));
      yield put(setSearchLoadingState(LoadingSearchState.LOADED));
    }
    yield put(setSearchLoadingState(LoadingSearchState.LOADED));
  } catch (e) {
    yield put(setSearchLoadingState(LoadingSearchState.ERROR));
  }
}

export function* searchSaga() {
  yield takeLatest(fetchSearchConversations.type, fetchSearchConversationsSaga);
  yield takeLatest(fetchSearchUsers.type, fetchSearchUsersSaga);
}
