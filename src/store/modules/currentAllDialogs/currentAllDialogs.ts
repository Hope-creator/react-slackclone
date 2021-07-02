import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/types";
import {
  LoadingCurrentAllDialogsState,
  ICurrentAllDialogsState,
} from "./types";

const initialState = {
  users: [],
  searchName: "",
  page: 0,
  count: 30,
  totalCount: 10,
  loadingState: "NEVER",
} as ICurrentAllDialogsState;

const currentcurrentAllDialogsSlicer = createSlice({
  name: "currentAllDialogs",
  initialState,
  reducers: {
    fetchCurrentAllDialogs(state) {
      state.loadingState = LoadingCurrentAllDialogsState.LOADING;
    },

    setCurrentAllDialogsLoadingState(
      state,
      action: PayloadAction<LoadingCurrentAllDialogsState>
    ) {
      state.loadingState = action.payload;
    },
    setCurrentAllDialogs(state, action: PayloadAction<IUser[] | []>) {
      state.users = [...state.users, ...action.payload];
    },
    updateOneCurrentAllDialogs(state, action: PayloadAction<IUser>) {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    setCurrentAllDialogsSearchName(state, action: PayloadAction<string>) {
      state.loadingState = LoadingCurrentAllDialogsState.LOADING;
      state.users = [];
      state.page = 0;
      state.searchName = action.payload;
    },
    setPageCurrentAllDialogs(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCountCurrentAllDialogs(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setTotalCountCurrentAllDialogs(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    clearCurrentAllDialogsState() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentAllDialogs,
  setCurrentAllDialogsLoadingState,
  setCurrentAllDialogs,
  setCurrentAllDialogsSearchName,
  setPageCurrentAllDialogs,
  updateOneCurrentAllDialogs,
  setCountCurrentAllDialogs,
  setTotalCountCurrentAllDialogs,
  clearCurrentAllDialogsState,
} = currentcurrentAllDialogsSlicer.actions;
export default currentcurrentAllDialogsSlicer.reducer;
