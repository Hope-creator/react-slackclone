import { takeEvery, call, put } from "redux-saga/effects";
import { conversationsApi } from "../../../services/api/converastionsApi";
import {
  fetchSideInfoMembers,
  setSideInfoMembers,
  setSideInfoMembersLoadingState,
} from "./SideInfoMembers";
import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/types";
import { LoadingSideInfoMembersState } from "./types";

function* fetchSideInfoMembersSaga(action: PayloadAction<string>) {
  try {
    const members: IUser[] = yield call(
      conversationsApi.getMembers,
      action.payload
    );
    yield put(setSideInfoMembers(members));
  } catch (e) {
    yield put(
      setSideInfoMembersLoadingState(LoadingSideInfoMembersState.ERROR)
    );
  }
}

export function* sideInfoMembersSaga() {
  yield takeEvery(fetchSideInfoMembers.type, fetchSideInfoMembersSaga);
}
