import { takeEvery, call, put } from "redux-saga/effects";
import { LoadingCurrentConversationState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setCurrentConversation,
  setCurrentConversationLoadingState,
  fetchCurrentConversation,
} from "./currentConversation";
import { IConversation } from "../conversations/types";
import { conversationsApi } from "../../../services/api/converastionsApi";

function* fetchCurrentConversationSaga(action: PayloadAction<string>) {
  try {
    const conversation: IConversation = yield call(
      conversationsApi.fetchConversation,
      action.payload
    );
    yield put(setCurrentConversation(conversation));
    yield put(
      setCurrentConversationLoadingState(LoadingCurrentConversationState.LOADED)
    );
  } catch (e) {
    yield put(
      setCurrentConversationLoadingState(LoadingCurrentConversationState.ERROR)
    );
  }
}

export function* currentConversationSaga() {
  yield takeEvery(fetchCurrentConversation.type, fetchCurrentConversationSaga);
}
