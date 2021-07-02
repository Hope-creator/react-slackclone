import { takeEvery, call, put, select } from "redux-saga/effects";
import {
  fetchCurrentAllDialogs,
  setCurrentAllDialogsLoadingState,
  setCurrentAllDialogs,
  setPageCurrentAllDialogs,
  setTotalCountCurrentAllDialogs,
} from "./currentAllDialogs";
import { IUser } from "../user/types";
import { userApi } from "../../../services/api/userApi";
import { LoadingCurrentAllDialogsState } from "./types";
import { setLocalHistoryItem } from "../../../functions/setLocalHistoryItem";
import { LocalHistoryItemType, PathesCustomNames } from "../../../constants";
import {
  selectCurrentAllDialogsPage,
  selectCurrentAllDialogsSearchName,
  selectCurrentAllDialogsCount,
} from "./selectors";
import { IPaginationData } from "../../../services/api/types";

function* fetchCurrentAllDialogsSaga() {
  try {
    const searchName: string = yield select(selectCurrentAllDialogsSearchName);
    const page: number = yield select(selectCurrentAllDialogsPage);
    const count: number = yield select(selectCurrentAllDialogsCount);
    const data: IPaginationData<IUser[]> = yield call(
      userApi.getAllUsers,
      searchName,
      page + 1,
      count
    );
    yield put(setTotalCountCurrentAllDialogs(data.totalCount || 0));
    yield put(setPageCurrentAllDialogs(page + 1));
    yield put(setCurrentAllDialogs(data.results));
    yield put(
      setCurrentAllDialogsLoadingState(LoadingCurrentAllDialogsState.LOADED)
    );
    setLocalHistoryItem(
      PathesCustomNames.ALLDIALOGS,
      LocalHistoryItemType.CUSTOM
    );
  } catch (e) {
    yield put(
      setCurrentAllDialogsLoadingState(LoadingCurrentAllDialogsState.ERROR)
    );
  }
}

export function* currentAllDialogsSaga() {
  yield takeEvery(fetchCurrentAllDialogs.type, fetchCurrentAllDialogsSaga);
}
