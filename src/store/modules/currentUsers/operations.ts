import { takeEvery, call, put, select } from "redux-saga/effects";
import {
  fetchCurrentUsers,
  setCurrentUsersLoadingState,
  setCurrentUsers,
  setPageCurrentUsers,
  setTotalCountCurrentUsers,
} from "./currentUsers";
import { IUser } from "../user/types";
import { userApi } from "../../../services/api/userApi";
import { LoadingCurrentUsersState } from "./types";
import { setLocalHistoryItem } from "../../../functions/setLocalHistoryItem";
import { LocalHistoryItemType, PathesCustomNames } from "../../../constants";
import {
  selectCurrentUsersCount,
  selectCurrentUsersPage,
  selectCurrentUsersSearchName,
} from "./selectors";
import { IPaginationData } from "../../../services/api/types";

function* fetchCurrentMembersSaga() {
  try {
    const searchName: string = yield select(selectCurrentUsersSearchName);
    const page: number = yield select(selectCurrentUsersPage);
    const count: number = yield select(selectCurrentUsersCount);
    const data: IPaginationData<IUser[]> = yield call(
      userApi.getAllUsers,
      searchName,
      page + 1,
      count
    );
    yield put(setTotalCountCurrentUsers(data.totalCount || 0));
    yield put(setPageCurrentUsers(page + 1));
    yield put(setCurrentUsers(data.results));
    yield put(setCurrentUsersLoadingState(LoadingCurrentUsersState.LOADED));
    setLocalHistoryItem(
      PathesCustomNames.PEOPLE_AND_USERS_GROUP,
      LocalHistoryItemType.CUSTOM
    );
  } catch (e) {
    yield put(setCurrentUsersLoadingState(LoadingCurrentUsersState.ERROR));
  }
}

export function* currentUsersSaga() {
  yield takeEvery(fetchCurrentUsers.type, fetchCurrentMembersSaga);
}
