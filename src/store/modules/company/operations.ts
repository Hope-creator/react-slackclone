import { takeEvery, call, put } from "redux-saga/effects";
import { ICompany, LoadingCompanyState } from "./types";
import { fetchCompany, setCompany, setCompanyLoadingState } from "./company";
import { companyApi } from "../../../services/api/companyApi";

function* fetchCompanySaga() {
  try {
    const company: ICompany = yield call(companyApi.fetchCompany);
    yield put(setCompany(company));
  } catch (e) {
    yield put(setCompanyLoadingState(LoadingCompanyState.ERROR));
  }
}

export function* userSaga() {
  yield takeEvery(fetchCompany.type, fetchCompanySaga);
}
