import { takeEvery, call, put, select } from "redux-saga/effects";
import {
  fetchCurrentAllDM,
  setCurrentAllDMLoadingState,
  setCurrentAllDM,
  setPageCurrentAllDM,
  setTotalCountCurrentAllDM,
} from "./currentAllDM";
import { IUser } from "../user/types";
import { userApi } from "../../../services/api/userApi";
import { LoadingCurrentAllDMState } from "./types";
import { setLocalHistoryItem } from "../../../functions/setLocalHistoryItem";
import { LocalHistoryItemType, PathesCustomNames } from "../../../constants";
import {
  selectCurrentAllDMPage,
selectCurrentAllDMSearchName,
selectCurrentAllDMCount,
} from "./selectors";
import { IPaginationData } from "../../../services/api/types";

function* fetchCurrentMembersSaga() {
  try {
    const searchName: string = yield select(selectCurrentAllDMSearchName);
    const page: number = yield select(selectCurrentAllDMPage);
    const count: number = yield select(selectCurrentAllDMCount);
    const data: IPaginationData<IUser[]> = yield call(
      userApi.getAllUsers,
      searchName,
      page + 1,
      count
    );
    yield put(setTotalCountCurrentAllDM(data.totalCount || 0));
    yield put(setPageCurrentAllDM(page + 1));
    yield put(setCurrentAllDM(data.results));
    yield put(setCurrentAllDMLoadingState(LoadingCurrentAllDMState.LOADED));
    setLocalHistoryItem(
      PathesCustomNames.ALLDIALOGS,
      LocalHistoryItemType.CUSTOM
    );
  } catch (e) {
    yield put(setCurrentAllDMLoadingState(LoadingCurrentAllDMState.ERROR));
  }
}

export function* currentAllDMSaga() {
  yield takeEvery(fetchCurrentAllDM.type, fetchCurrentMembersSaga);
}
