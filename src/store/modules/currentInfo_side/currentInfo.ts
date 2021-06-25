import { IConversation } from "./../conversations/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/types";
import {
  ICurrentInfoState,
  InfoItemTypeState,
  LoadingCurrentInfoState,
} from "./types";

const initialState = {
  item: undefined,
  type: "NONE",
  loadingState: "NEVER",
} as ICurrentInfoState;

const currentInfoSlicer = createSlice({
  name: "CurrentInfo",
  initialState,
  reducers: {
    fetchCurrentInfoChannel(state, action: PayloadAction<string>) {
      state.loadingState = LoadingCurrentInfoState.LOADING;
    },
    fetchCurrentInfoProfile(state, action: PayloadAction<string>) {
      state.loadingState = LoadingCurrentInfoState.LOADING;
    },
    setCurrentInfoChannel(state, action: PayloadAction<IConversation>) {
      state.item = action.payload;
      state.type = InfoItemTypeState.CHANNEL;
    },
    setCurrentInfoProfile(state, action: PayloadAction<IUser>) {
      state.item = action.payload;
      state.type = InfoItemTypeState.PROFILE;
    },
    setCurrentInfoLoadingState(
      state,
      action: PayloadAction<LoadingCurrentInfoState>
    ) {
      state.loadingState = action.payload;
    },
    updateCurrentInfoConversation(state, action: PayloadAction<IConversation>) {
      if (state.type === InfoItemTypeState.CHANNEL) {
        state.item = action.payload;
      }
    },
    updateCurrentInfoProfile(state, action: PayloadAction<IUser>) {
      if (state.type === InfoItemTypeState.PROFILE) {
        state.item = action.payload;
      }
    },
    clearCurrentInfo() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentInfoChannel,
  fetchCurrentInfoProfile,
  setCurrentInfoChannel,
  setCurrentInfoProfile,
  setCurrentInfoLoadingState,
  updateCurrentInfoConversation,
  updateCurrentInfoProfile,
  clearCurrentInfo,
} = currentInfoSlicer.actions;
export default currentInfoSlicer.reducer;
