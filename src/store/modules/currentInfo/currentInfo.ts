import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConversation } from "../conversations/types";
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
    setCurrentInfoChannel(state, action: PayloadAction<IConversation>) {
      state.item = action.payload;
      state.type = InfoItemTypeState.CHANNEL;
    },
    setCurrentInfoUser(state, action: PayloadAction<IUser>) {
      state.item = action.payload;
      state.type = InfoItemTypeState.PROFILE;
    },
    setCurrentInfoLoadingState(
      state,
      action: PayloadAction<LoadingCurrentInfoState>
    ) {
      state.loadingState = action.payload;
    },
  },
});

export const {
  setCurrentInfoChannel,
  setCurrentInfoUser,
  setCurrentInfoLoadingState,
} = currentInfoSlicer.actions;
export default currentInfoSlicer.reducer;
