import { takeEvery, call, put } from "redux-saga/effects";
import { LoadingCurrentDialogState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCurrentDialog,
  setCurrentDialog,
  setCurrentDialogLoadingState,
} from "./currentDialog";
import { IDialog } from "../dialogs/types";
import { dialogsApi } from "../../../services/api/dialogsApi";

function* fetchCurrentDialogSaga(action: PayloadAction<string>) {
  try {
    const dialog: IDialog = yield call(dialogsApi.fetchDialog, action.payload);
    yield put(setCurrentDialog(dialog));
    yield put(setCurrentDialogLoadingState(LoadingCurrentDialogState.LOADED));
  } catch (e) {
    yield put(setCurrentDialogLoadingState(LoadingCurrentDialogState.ERROR));
  }
}

export function* currentDialogSaga() {
  yield takeEvery(fetchCurrentDialog.type, fetchCurrentDialogSaga);
}
