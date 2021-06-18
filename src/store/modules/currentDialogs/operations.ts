import { dialogsApi } from "./../../../services/api/dialogsApi";
import { takeEvery, call, put } from "redux-saga/effects";
import { LoadingCurrentDialogsState } from "./types";
import {
  fetchCurrentDialogs,
  setCurrentDialogs,
  setCurrentDialogsLoadingState,
} from "./currentDialogs";
import { IDialog } from "../dialogs/types";
import { setLocalHistoryItem } from "../../../functions/setLocalHistoryItem";
import { LocalHistoryItemType, PathesCustomNames } from "../../../constants";

function* fetchCurrentDialogsSaga() {
  try {
    const dialogs: IDialog[] = yield call(dialogsApi.fetchDialogs);
    yield put(setCurrentDialogs(dialogs));
    yield put(setCurrentDialogsLoadingState(LoadingCurrentDialogsState.LOADED));
    setLocalHistoryItem(
      PathesCustomNames.ALLDIALOGS,
      LocalHistoryItemType.CUSTOM
    );
  } catch (e) {
    yield put(setCurrentDialogsLoadingState(LoadingCurrentDialogsState.ERROR));
  }
}

export function* currentDialogsSaga() {
  yield takeEvery(fetchCurrentDialogs.type, fetchCurrentDialogsSaga);
}
