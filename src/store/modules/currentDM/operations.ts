import { takeEvery, call, put } from "redux-saga/effects";
import { LoadingCurrentDMState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCurrentDM,
  setCurrentDMPartner,
  setCurrentDMLoadingState,
} from "./currentDM";
import { LocalHistoryItemType } from "../../../constants";
import { setLocalHistoryItem } from "../../../functions/setLocalHistoryItem";
import { userApi } from "../../../services/api/userApi";
import { IUser } from "../user/types";

function* fetchCurrentDMSaga(action: PayloadAction<string>) {
  try {
    const partner: IUser = yield call(userApi.getUser, action.payload);
    yield put(setCurrentDMPartner(partner));
    yield put(setCurrentDMLoadingState(LoadingCurrentDMState.LOADED));
    setLocalHistoryItem(partner, LocalHistoryItemType.USER);
  } catch (e) {
    yield put(setCurrentDMLoadingState(LoadingCurrentDMState.ERROR));
  }
}

export function* currentDMSaga() {
  yield takeEvery(fetchCurrentDM.type, fetchCurrentDMSaga);
}
