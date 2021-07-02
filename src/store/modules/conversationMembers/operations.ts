import { takeEvery, call, put } from "redux-saga/effects";
import { conversationsApi } from "../../../services/api/conversationsApi";
import {
  fetchConversationMembers,
  setConversationMembers,
  setConversationMembersLoadingState,
} from "./conversationMembers";
import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/types";
import { LoadingConversationsMembersState } from "./types";

function* fetchConversationMembersSaga(action: PayloadAction<string>) {
  try {
    const members: IUser[] = yield call(
      conversationsApi.getMembers,
      action.payload
    );
    yield put(setConversationMembers(members));
  } catch (e) {
    yield put(
      setConversationMembersLoadingState(LoadingConversationsMembersState.ERROR)
    );
  }
}

export function* conversationMembersSaga() {
  yield takeEvery(fetchConversationMembers.type, fetchConversationMembersSaga);
}
