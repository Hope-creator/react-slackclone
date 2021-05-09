import { all } from "redux-saga/effects";
import { conversationsSaga } from "./modules/conversations/operations";
import { messagesSaga } from "./modules/messages/operations";
import { userSaga } from "./modules/user/operations";

export default function* rootSaga() {
  yield all([userSaga(), messagesSaga(), conversationsSaga()]);
}
