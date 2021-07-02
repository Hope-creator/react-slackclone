import { takeEvery, call, put } from "redux-saga/effects";
import { LoadingCurrentDialogState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCurrentDialog,
  setCurrentDialogPartner,
  setCurrentDialogLoadingState,
} from "./currentDialog";
import { LocalHistoryItemType } from "../../../constants";
import { setLocalHistoryItem } from "../../../functions/setLocalHistoryItem";
import { userApi } from "../../../services/api/userApi";
import { IUser } from "../user/types";

function* fetchCurrentDialogSaga(action: PayloadAction<string>) {
  try {
    const partner: IUser = yield call(userApi.getUser, action.payload);
    yield put(setCurrentDialogPartner(partner));
    yield put(setCurrentDialogLoadingState(LoadingCurrentDialogState.LOADED));
    setLocalHistoryItem(partner, LocalHistoryItemType.USER);
  } catch (e) {
    yield put(setCurrentDialogLoadingState(LoadingCurrentDialogState.ERROR));
  }
}

export function* currentDialogSaga() {
  yield takeEvery(fetchCurrentDialog.type, fetchCurrentDialogSaga);
}
