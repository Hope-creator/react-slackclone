import { takeEvery, call, put } from "redux-saga/effects";
import {
  setCurrentMembersLoadingState,
  setCurrentMembers,
  fetchCurrentMembers,
} from "./currentMembers";
import { IUser } from "../user/types";
import { userApi } from "../../../services/api/userApi";
import { LoadingCurrentMembersState } from "./types";
import { setLocalHistoryItem } from "../../../functions/setLocalHistoryItem";
import { LocalHistoryItemType, PathesCustomNames } from "../../../constants";

function* fetchCurrentMembersSaga() {
  try {
    const members: IUser[] | [] = yield call(userApi.getAllUsers);
    yield put(setCurrentMembers(members));
    yield put(setCurrentMembersLoadingState(LoadingCurrentMembersState.LOADED));
    setLocalHistoryItem(
      PathesCustomNames.PEOPLE_AND_USERS_GROUP,
      LocalHistoryItemType.CUSTOM
    );
  } catch (e) {
    yield put(setCurrentMembersLoadingState(LoadingCurrentMembersState.ERROR));
  }
}

export function* currentMembersSaga() {
  yield takeEvery(fetchCurrentMembers.type, fetchCurrentMembersSaga);
}
