import { takeEvery, call, put } from "redux-saga/effects";
import { conversationsApi } from "../../../services/api/conversationsApi";
import {
  fetchJoinOneConversation,
  successAccessOneConversation,
  errorAccesOneConversation,
  fetchLeaveOneConversation,
} from "./conversationsAccess";
import { PayloadAction } from "@reduxjs/toolkit";
import { addUserConversation, removeUserConversation } from "../user/user";
import { IConversation } from "../conversations/types";
import { deleteOneConversation } from "../conversations/conversations";
import { deleteOneCurrentConversations } from "../currentConversations/currentConversations";

function* joinOneConversationsSaga(action: PayloadAction<string>) {
  try {
    const conversation: IConversation = yield call(
      conversationsApi.joinConversations,
      action.payload
    );
    yield put(addUserConversation(conversation._id));
    yield put(successAccessOneConversation(conversation._id));
  } catch (e) {
    yield put(errorAccesOneConversation(action.payload));
  }
}

function* leaveConversationSaga(action: PayloadAction<string>) {
  try {
    const conversation: IConversation = yield call(
      conversationsApi.leave,
      action.payload
    );

    yield put(removeUserConversation(conversation._id));
    yield put(successAccessOneConversation(conversation._id));
    if (conversation.is_private) {
      yield put(deleteOneConversation(conversation._id));
      yield put(deleteOneCurrentConversations(conversation._id));
    }
    yield put(successAccessOneConversation(conversation._id));
  } catch (e) {
    yield put(errorAccesOneConversation(action.payload));
  }
}

export function* conversationsAccessSaga() {
  yield takeEvery(fetchJoinOneConversation.type, joinOneConversationsSaga);
  yield takeEvery(fetchLeaveOneConversation.type, leaveConversationSaga);
}
