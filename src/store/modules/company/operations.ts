import { takeEvery, call, put, select } from "redux-saga/effects";
import { ICompany, LoadingCompanyState } from "./types";
import { fetchCompany, setCompany, setCompanyLoadingState } from "./company";
import { companyApi } from "../../../services/api/companyApi";
import { selectUser } from "../user/selectors";
import { IUser } from "../user/types";

function* fetchCompanySaga() {
  try {
    const user: IUser = yield select(selectUser);
    const company: ICompany = yield call(companyApi.fetchCompany, user.companyId);
    yield put(setCompany(company));
  } catch (e) {
    yield put(setCompanyLoadingState(LoadingCompanyState.ERROR));
  }
}

export function* companySaga() {
  yield takeEvery(fetchCompany.type, fetchCompanySaga);
}
