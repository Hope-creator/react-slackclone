import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/types";
import { LoadingCurrentAllDMState, ICurrentAllDMState } from "./types";

const initialState = {
  users: [],
  searchName: "",
  page: 0,
  count: 30,
  totalCount: 10,
  loadingState: "NEVER",
} as ICurrentAllDMState;

const currentcurrentAllDMSlicer = createSlice({
  name: "currentAllDM",
  initialState,
  reducers: {
    fetchCurrentAllDM(state) {
      state.loadingState = LoadingCurrentAllDMState.LOADING;
    },
    setCurrentAllDMLoadingState(
      state,
      action: PayloadAction<LoadingCurrentAllDMState>
    ) {
      state.loadingState = action.payload;
    },
    setCurrentAllDM(state, action: PayloadAction<IUser[] | []>) {
      state.users = [...state.users, ...action.payload];
    },
    setCurrentAllDMSearchName(state, action: PayloadAction<string>) {
      state.loadingState = LoadingCurrentAllDMState.LOADING;
      state.users = [];
      state.page = 0;
      state.searchName = action.payload;
    },
    setPageCurrentAllDM(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCountCurrentAllDM(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setTotalCountCurrentAllDM(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    clearCurrentAllDMState() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentAllDM,
  setCurrentAllDMLoadingState,
  setCurrentAllDM,
  setCurrentAllDMSearchName,
  setPageCurrentAllDM,
  setCountCurrentAllDM,
  setTotalCountCurrentAllDM,
  clearCurrentAllDMState,
} = currentcurrentAllDMSlicer.actions;
export default currentcurrentAllDMSlicer.reducer;
