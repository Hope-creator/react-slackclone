import { all } from "redux-saga/effects";
import { conversationsSaga } from "./modules/conversations/operations";
import { currentConversationSaga } from "./modules/currentConversation/operations";
import { userSaga } from "./modules/user/operations";

export default function* rootSaga() {
  yield all([userSaga(), currentConversationSaga(), conversationsSaga()]);
}
