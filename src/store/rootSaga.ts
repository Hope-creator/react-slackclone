import { all } from "redux-saga/effects";
import { conversationsSaga } from "./modules/conversations/operations";
import { currentConversationSaga } from "./modules/currentConversation/operations";
import { currentInfoSaga } from "./modules/currentInfo_side/operations";
import { currentMembersSaga } from "./modules/currentMembers/operations";
import { messagesSaga } from "./modules/messages/operations";
import { readMessageSaga } from "./modules/readMessage/operations";
import { userSaga } from "./modules/user/operations";

export default function* rootSaga() {
  yield all([
    userSaga(),
    currentConversationSaga(),
    conversationsSaga(),
    currentInfoSaga(),
    currentMembersSaga(),
    readMessageSaga(),
    messagesSaga(),
  ]);
}
