import { all } from "redux-saga/effects";
import { companySaga } from "./modules/company/operations";
import { userSaga } from "./modules/user/operations";

export default function* rootSaga() {
  yield all([userSaga(), companySaga()]);
}
