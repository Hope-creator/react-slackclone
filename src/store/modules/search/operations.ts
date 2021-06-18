import { pathesCustomNamesArray } from "../../../constants/PathesCustomNames";
import { IConversation } from "./../conversations/types";
import { dialogsApi } from "./../../../services/api/dialogsApi";
import { IDialog } from "./../dialogs/types";
import { call, put, takeLatest } from "redux-saga/effects";
import { LoadingSearchState } from "./types";
import {
  setSearch,
  setResultsConversations,
  setResultsDialogs,
  setResultsCustom,
  setSearchLoadingState,
} from "./search";
import { PayloadAction } from "@reduxjs/toolkit";
import { conversationsApi } from "../../../services/api/converastionsApi";

function* fetchSearchSaga(action: PayloadAction<string>) {
  try {
    if(action.payload) {
    const regExpPayload = new RegExp(action.payload, "gi");
    const customResults = pathesCustomNamesArray.filter((name) =>
      name.match(regExpPayload)
    );
    console.log(customResults);
    const dialogs: IDialog[] = yield call(
      dialogsApi.fetchDialogs,
      action.payload
    );
    const converastions: IConversation[] = yield call(
      conversationsApi.fetchConversations,
      action.payload
    );
    yield put(setResultsCustom(customResults));
    yield put(setResultsConversations(converastions));
    yield put(setResultsDialogs(dialogs));
    yield put(setSearchLoadingState(LoadingSearchState.LOADED));
  }
  } catch (e) {
    yield put(setSearchLoadingState(LoadingSearchState.ERROR));
  }
}

export function* searchSaga() {
  yield takeLatest(setSearch.type, fetchSearchSaga);
}
