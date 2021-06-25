import { IUser } from './../user/types';
import { pathesCustomNamesArray } from "../../../constants/PathesCustomNames";
import { IConversation } from "./../conversations/types";
import { call, put, takeLatest } from "redux-saga/effects";
import { LoadingSearchState } from "./types";
import {
  setSearch,
  setResultsConversations,
  setResultsUsers,
  setResultsCustom,
  setSearchLoadingState,
} from "./search";
import { PayloadAction } from "@reduxjs/toolkit";
import { conversationsApi } from "../../../services/api/converastionsApi";
import { userApi } from '../../../services/api/userApi';

function* fetchSearchSaga(action: PayloadAction<string>) {
  try {
    if(action.payload) {
    const regExpPayload = new RegExp(action.payload, "gi");
    const customResults = pathesCustomNamesArray.filter((name) =>
      name.match(regExpPayload)
    );
    console.log(customResults);
    const users: IUser[] = yield call(
      userApi.getAllUsers,
      action.payload
    );
    const converastions: IConversation[] = yield call(
      conversationsApi.fetchConversations,
      action.payload
    );
    yield put(setResultsCustom(customResults));
    yield put(setResultsConversations(converastions));
    yield put(setResultsUsers(users));
    yield put(setSearchLoadingState(LoadingSearchState.LOADED));
  }
  } catch (e) {
    yield put(setSearchLoadingState(LoadingSearchState.ERROR));
  }
}

export function* searchSaga() {
  yield takeLatest(setSearch.type, fetchSearchSaga);
}
