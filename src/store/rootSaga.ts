import { all } from "redux-saga/effects";
import { conversationMembersSaga } from "./modules/conversationMembers/operations";
import { conversationsSaga } from "./modules/conversations/operations";
import { currentConversationSaga } from "./modules/currentConversation/operations";
import { currentConversationsSaga } from "./modules/currentConversations/operations";
import { currentInfoSaga } from "./modules/currentInfo_side/operations";
import { currentUsersSaga } from "./modules/currentUsers/operations";
import { conversationsAccessSaga } from "./modules/conversationsAccess/operations";
import { messagesSaga } from "./modules/messages/operations";
import { readMessageSaga } from "./modules/readMessage/operations";
import { searchSaga } from "./modules/search/operations";
import { sideInfoMembersSaga } from "./modules/SideInfoMembers/operations";
import { userSaga } from "./modules/user/operations";
import { usersSaga } from "./modules/users/operations";
import { currentDMSaga } from "./modules/currentDM/operations";
import { currentAllDMSaga } from "./modules/currentAllDM/operations";

export default function* rootSaga() {
  yield all([
    userSaga(),
    usersSaga(),
    currentConversationSaga(),
    currentAllDMSaga(),
    currentDMSaga(),
    currentConversationsSaga(),
    currentInfoSaga(),
    currentUsersSaga(),
    conversationsSaga(),
    readMessageSaga(),
    messagesSaga(),
    sideInfoMembersSaga(),
    conversationMembersSaga(),
    conversationsAccessSaga(),
    searchSaga(),
  ]);
}
