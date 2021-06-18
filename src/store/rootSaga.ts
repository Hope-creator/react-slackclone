import { all } from "redux-saga/effects";
import { conversationMembersSaga } from "./modules/conversationMembers/operations";
import { conversationsSaga } from "./modules/conversations/operations";
import { currentConversationSaga } from "./modules/currentConversation/operations";
import { currentConversationsSaga } from "./modules/currentConversations/operations";
import { currentDialogSaga } from "./modules/currentDialog/operations";
import { currentDialogsSaga } from "./modules/currentDialogs/operations";
import { currentInfoSaga } from "./modules/currentInfo_side/operations";
import { currentMembersSaga } from "./modules/currentMembers/operations";
import { dialogsSaga } from "./modules/dialogs/operations";
import { joinConversationsSaga } from "./modules/joinConversations/operations";
import { messagesSaga } from "./modules/messages/operations";
import { readMessageSaga } from "./modules/readMessage/operations";
import { searchSaga } from "./modules/search/operations";
import { sideInfoMembersSaga } from "./modules/SideInfoMembers/operations";
import { userSaga } from "./modules/user/operations";

export default function* rootSaga() {
  yield all([
    userSaga(),
    currentConversationSaga(),
    currentConversationsSaga(),
    currentInfoSaga(),
    currentMembersSaga(),
    currentDialogSaga(),
    currentDialogsSaga(),
    conversationsSaga(),
    readMessageSaga(),
    messagesSaga(),
    sideInfoMembersSaga(),
    conversationMembersSaga(),
    dialogsSaga(),
    joinConversationsSaga(),
    searchSaga(),
  ]);
}
