import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConversation } from "../conversations/types";
import {
  ICurrentConversationState,
  LoadingCurrentConversationState,
} from "./types";

const initialState = {
  currentConversation: undefined,
  loadingState: LoadingCurrentConversationState.NEVER,
} as ICurrentConversationState;

const currentConversationSlicer = createSlice({
  name: "currentConversation",
  initialState,
  reducers: {
    fetchCurrentConversation(state, payload: PayloadAction<string>) {
      state.loadingState = LoadingCurrentConversationState.LOADING;
    },
    setCurrentConversation(state, action: PayloadAction<IConversation>) {
      state.currentConversation = action.payload;
    },
    setCurrentConversationLoadingState(
      state,
      action: PayloadAction<LoadingCurrentConversationState>
    ) {
      state.loadingState = action.payload;
    },
    updateCurrentConversation(state, action: PayloadAction<IConversation>){
     if(state.currentConversation) state.currentConversation = action.payload;
    },
    addMemberCurrentConversation(state) {
      if (state.currentConversation) state.currentConversation.num_members++;
    },
    clearCurrentConversation() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentConversation,
  setCurrentConversation,
  setCurrentConversationLoadingState,
  addMemberCurrentConversation,
  updateCurrentConversation,
  clearCurrentConversation,
} = currentConversationSlicer.actions;
export default currentConversationSlicer.reducer;
