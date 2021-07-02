import { IConversation } from "../conversations/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/types";
import {
  IInfoSideState,
  InfoItemTypeState,
  LoadingInfoSideState,
} from "./types";

const initialState = {
  item: undefined,
  type: "NONE",
  loadingState: "NEVER",
} as IInfoSideState;

const infoSideSlicer = createSlice({
  name: "infoSide",
  initialState,
  reducers: {
    fetchInfoSideChannel(state, action: PayloadAction<string>) {
      state.loadingState = LoadingInfoSideState.LOADING;
    },
    fetchInfoSideProfile(state, action: PayloadAction<string>) {
      state.loadingState = LoadingInfoSideState.LOADING;
    },
    setInfoSideChannel(state, action: PayloadAction<IConversation>) {
      state.item = action.payload;
      state.type = InfoItemTypeState.CHANNEL;
    },
    setInfoSideProfile(state, action: PayloadAction<IUser>) {
      state.item = action.payload;
      state.type = InfoItemTypeState.PROFILE;
    },
    setInfoSideLoadingState(
      state,
      action: PayloadAction<LoadingInfoSideState>
    ) {
      state.loadingState = action.payload;
    },
    updateInfoSideConversation(state, action: PayloadAction<IConversation>) {
      if (
        state.type === InfoItemTypeState.CHANNEL &&
        state.item &&
        state.item._id === action.payload._id
      ) {
        state.item = action.payload;
      }
    },
    updateInfoSideUser(state, action: PayloadAction<IUser>) {
      if (
        state.type === InfoItemTypeState.PROFILE &&
        state.item &&
        state.item._id === action.payload._id
      ) {
        state.item = action.payload;
      }
    },
    updateInfoSideProfile(state, action: PayloadAction<IUser>) {
      if (state.type === InfoItemTypeState.PROFILE) {
        state.item = action.payload;
      }
    },
    clearInfoSideConversation(state, action: PayloadAction<string>) {
      if (
        state.type === InfoItemTypeState.CHANNEL &&
        state.item &&
        state.item._id === action.payload
      ) {
        return initialState;
      }
    },
    clearInfoSideState() {
      return initialState;
    },
  },
});

export const {
  fetchInfoSideChannel,
  fetchInfoSideProfile,
  setInfoSideChannel,
  setInfoSideProfile,
  setInfoSideLoadingState,
  updateInfoSideConversation,
  updateInfoSideUser,
  clearInfoSideConversation,
  updateInfoSideProfile,
  clearInfoSideState,
} = infoSideSlicer.actions;
export default infoSideSlicer.reducer;
