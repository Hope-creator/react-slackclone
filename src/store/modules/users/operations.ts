import { userApi } from "./../../../services/api/userApi";
import { takeEvery, call, put, select } from "redux-saga/effects";
import { LoadingUsersState } from "./types";
import {
  fetchUsers,
  setPageUsers,
  setTotalCountUsers,
  setUsers,
  setUsersLoadingState,
} from "./users";
import { IUser } from "../user/types";
import { selectUsersCount, selectUsersPage } from "./selectors";
import { IPaginationData } from "../../../services/api/types";

function* fetchUsersSaga() {
  try {
    const page: number = yield select(selectUsersPage);
    const count: number = yield select(selectUsersCount);
    const data: IPaginationData<IUser[]> = yield call(
      userApi.getAllUsers,
      "",
      page + 1,
      count
    );
    yield put(setTotalCountUsers(data.totalCount || 0));
    yield put(setUsers(data.results));
    yield put(setPageUsers(page + 1));
    yield put(setUsersLoadingState(LoadingUsersState.LOADED));
  } catch (e) {
    yield put(setUsersLoadingState(LoadingUsersState.ERROR));
  }
}

export function* usersSaga() {
  yield takeEvery(fetchUsers.type, fetchUsersSaga);
}
