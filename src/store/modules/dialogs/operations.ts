import { takeEvery, call, put } from "redux-saga/effects";
import { IDialog, LoadingDialogsState } from "./types";
import {
  fetchDialogs,
  setDialogs,
  setConversationsLoadingState,
} from "./dialogs";
import { dialogsApi } from "../../../services/api/dialogsApi";

function* fetchDialogsSaga() {
  try {
    const conversations: IDialog[] | [] = yield call(dialogsApi.fetchDialogs);
    yield put(setDialogs(conversations));
  } catch (e) {
    yield put(setConversationsLoadingState(LoadingDialogsState.ERROR));
  }
}

export function* dialogsSaga() {
  yield takeEvery(fetchDialogs.type, fetchDialogsSaga);
}
