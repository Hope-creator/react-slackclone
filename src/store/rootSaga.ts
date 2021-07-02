import { all } from "redux-saga/effects";
import { conversationMembersSaga } from "./modules/conversationMembers/operations";
import { conversationsSaga } from "./modules/conversations/operations";
import { currentConversationSaga } from "./modules/currentConversation/operations";
import { currentConversationsSaga } from "./modules/currentConversations/operations";
import { infoSideSaga } from "./modules/infoSide/operations";
import { currentUsersSaga } from "./modules/currentUsers/operations";
import { conversationsAccessSaga } from "./modules/conversationsAccess/operations";
import { messagesSaga } from "./modules/messages/operations";
import { messagesAffectSaga } from "./modules/messagesAffect/operations";
import { searchSaga } from "./modules/search/operations";
import { sideInfoMembersSaga } from "./modules/SideInfoMembers/operations";
import { userSaga } from "./modules/user/operations";
import { usersSaga } from "./modules/users/operations";
import { currentDialogSaga } from "./modules/currentDialog/operations";
import { currentAllDialogsSaga } from "./modules/currentAllDialogs/operations";

export default function* rootSaga() {
  yield all([
    userSaga(),
    usersSaga(),
    currentConversationSaga(),
    currentAllDialogsSaga(),
    currentDialogSaga(),
    currentConversationsSaga(),
    infoSideSaga(),
    currentUsersSaga(),
    conversationsSaga(),
    messagesAffectSaga(),
    messagesSaga(),
    sideInfoMembersSaga(),
    conversationMembersSaga(),
    conversationsAccessSaga(),
    searchSaga(),
  ]);
}
