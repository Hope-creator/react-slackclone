import { takeEvery, call, put } from "redux-saga/effects";
import { conversationsApi } from "../../../services/api/converastionsApi";
import {
  fetchConverastionMembers,
  setConverastionMembers,
  setConverastionMembersLoadingState,
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
    yield put(setConverastionMembers(members));
  } catch (e) {
    yield put(
      setConverastionMembersLoadingState(LoadingConversationsMembersState.ERROR)
    );
  }
}

export function* conversationMembersSaga() {
  yield takeEvery(fetchConverastionMembers.type, fetchConversationMembersSaga);
}
