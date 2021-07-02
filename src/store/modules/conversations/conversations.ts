import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IConversation,
  IConversationsState,
  LoadingConversationsState,
} from "./types";

const initialState = {
  conversations: [],
  page: 0,
  count: 20,
  totalCount: 20,
  loadingState: LoadingConversationsState.NEVER,
} as IConversationsState;

const conversationsSlice = createSlice({
  name: "Conversations",
  initialState,
  reducers: {
    fetchConversations(state) {
      state.loadingState = LoadingConversationsState.LOADING;
    },
    setConversations(state, action: PayloadAction<IConversation[] | []>) {
      state.conversations = [...state.conversations, ...action.payload];
    },
    setPageConversations(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setTotalCountConversations(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setConversationsLoadingState(
      state,
      action: PayloadAction<LoadingConversationsState>
    ) {
      state.loadingState = action.payload;
    },
    updateConversation(state, action: PayloadAction<IConversation>) {
      const index = state.conversations.findIndex(
        (conversation) => conversation._id === action.payload._id
      );
      if (index !== -1) state.conversations.splice(index, 1, action.payload);
    },
    addMemberConversations(state, action: PayloadAction<string>) {
      const index = state.conversations.findIndex(
        (conversation) => conversation._id === action.payload
      );
      if (index !== -1) state.conversations[index].num_members++;
    },
    addOneConversation(state, action: PayloadAction<IConversation>) {
      state.conversations = [action.payload, ...state.conversations];
    },
    deleteOneConversation(state, action: PayloadAction<string>) {
      const index = state.conversations.findIndex(
        (conversation) => conversation._id === action.payload
      );
      if (index !== -1) state.conversations.splice(index, 1);
    },
  },
});

export const {
  fetchConversations,
  setConversations,
  setConversationsLoadingState,
  addOneConversation,
  updateConversation,
  deleteOneConversation,
  addMemberConversations,
  setPageConversations,
  setTotalCountConversations,
} = conversationsSlice.actions;
export default conversationsSlice.reducer;
