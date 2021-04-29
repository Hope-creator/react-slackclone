import { ICompany, ICompanyState, LoadingCompanyState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { company: null, loadingState: "NEVER" } as ICompanyState;

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    fetchCompany(state) {
      state.loadingState = LoadingCompanyState.LOADING;
    },
    setCompany(state, action: PayloadAction<ICompany>) {
      state.company = action.payload;
      state.loadingState = LoadingCompanyState.LOADED;
    },
    setCompanyLoadingState(state, action: PayloadAction<LoadingCompanyState>) {
      state.loadingState = action.payload;
    },
  },
});

export const {
  fetchCompany,
  setCompany,
  setCompanyLoadingState,
} = companySlice.actions;
export default companySlice.reducer;
