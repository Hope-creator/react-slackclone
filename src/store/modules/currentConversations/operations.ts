import { takeEvery, call, put } from "redux-saga/effects";
import { LoadingCurrentConversationsState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setCurrentConversations,
  setCurrentConversationsLoadingState,
  fetchCurrentConversations,
} from "./currentConversations";
import { IConversation } from "../conversations/types";
import { conversationsApi } from "../../../services/api/converastionsApi";
import { setLocalHistoryItem } from "../../../functions/setLocalHistoryItem";
import { LocalHistoryItemType, PathesCustomNames } from "../../../constants";

function* fetchCurrentConversationsSaga(action: PayloadAction<string>) {
  try {
    const conversations: IConversation[] = yield call(
      conversationsApi.fetchConversations,
      action.payload
    );
    yield put(setCurrentConversations(conversations));

    yield put(
      setCurrentConversationsLoadingState(LoadingCurrentConversationsState.LOADED)
    );
    setLocalHistoryItem(
      PathesCustomNames.CHANNEL_BROWSER,
      LocalHistoryItemType.CUSTOM
    );
  } catch (e) {
    console.log(e);

    yield put(
      setCurrentConversationsLoadingState(LoadingCurrentConversationsState.ERROR)
    );
  }
}

export function* currentConversationsSaga() {
  yield takeEvery(fetchCurrentConversations.type, fetchCurrentConversationsSaga);
}
