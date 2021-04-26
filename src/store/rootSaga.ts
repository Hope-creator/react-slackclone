import { all } from "redux-saga/effects";
import { userSaga } from "./modules/user/operations";

export default function* rootSaga() {
  yield all([userSaga()]);
}
