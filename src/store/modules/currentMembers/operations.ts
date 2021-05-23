import { takeEvery, call, put } from "redux-saga/effects";
import {
  setCurrentMembersLoadingState,
  setCurrentMembers,
  fetchCurrentMembers,
} from "./currentMembers";
import { IUser } from "../user/types";
import { userApi } from "../../../services/api/userApi";
import { LoadingCurrentMembersState } from "./types";

function* fetchCurrentMembersSaga() {
  try {
    const members: IUser[] | [] = yield call(userApi.getAllUsers);
    yield put(setCurrentMembers(members));
    yield put(setCurrentMembersLoadingState(LoadingCurrentMembersState.LOADED));
  } catch (e) {
    yield put(setCurrentMembersLoadingState(LoadingCurrentMembersState.ERROR));
  }
}

export function* currentMembersSaga() {
  yield takeEvery(fetchCurrentMembers.type, fetchCurrentMembersSaga);
}
