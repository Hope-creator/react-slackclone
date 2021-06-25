import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConversation } from "../conversations/types";
import {
  ICurrentConversationsState,
  LoadingCurrentConversationsState,
} from "./types";

const initialState = {
  conversations: [],
  searchName: "",
  page: 0,
  count: 20,
  totalCount: 20,
  loadingState: LoadingCurrentConversationsState.NEVER,
} as ICurrentConversationsState;

const currentConversationsSlicer = createSlice({
  name: "currentConversations",
  initialState,
  reducers: {
    fetchCurrentConversations(state) {
      state.loadingState = LoadingCurrentConversationsState.LOADING;
    },
    setCurrentConversations(state, action: PayloadAction<IConversation[]>) {
      state.conversations = [...state.conversations, ...action.payload];
    },
    setCurrentConversationsLoadingState(
      state,
      action: PayloadAction<LoadingCurrentConversationsState>
    ) {
      state.loadingState = action.payload;
    },
    setCurrentConversationsSearchName(state, action: PayloadAction<string>) {
      state.loadingState = LoadingCurrentConversationsState.LOADING;
      state.conversations = [];
      state.page = 0;
      state.searchName = action.payload;
    },
    setPageCurrentConversations(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCountCurrentConversations(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setTotalCountCurrentConversations(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    clearCurrentConversationsState() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentConversations,
  setCurrentConversations,
  setCurrentConversationsLoadingState,
  clearCurrentConversationsState,
  setCurrentConversationsSearchName,
  setPageCurrentConversations,
  setCountCurrentConversations,
  setTotalCountCurrentConversations,
} = currentConversationsSlicer.actions;
export default currentConversationsSlicer.reducer;
