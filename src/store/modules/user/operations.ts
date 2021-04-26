import { userApi } from "./../../../services/api/userApi";
import { takeEvery, call, put } from "redux-saga/effects";
import { IUser, LoadingUserState } from "./types";
import { fetchUser, setUser, setUserLoadingState } from "./user";

function* fetchUserSaga() {
    try{
        const user: IUser = yield call(userApi.fetchUser);
        yield put(setUser(user))
    }
    catch(e) {
        yield put(setUserLoadingState(LoadingUserState.ERROR))
    }
}

export function* userSaga() {
  yield takeEvery(fetchUser.type, fetchUserSaga);
}