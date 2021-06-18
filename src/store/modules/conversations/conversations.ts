import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IConversation,
  IConversationsState,
  LoadingConversationsState,
} from "./types";

const initialState = {
  conversations: [],
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
      state.conversations = action.payload;
      state.loadingState = LoadingConversationsState.LOADED;
    },
    setConversationsLoadingState(
      state,
      action: PayloadAction<LoadingConversationsState>
    ) {
      state.loadingState = action.payload;
    },
    addOneConversation(state, action: PayloadAction<IConversation>) {
      const index = state.conversations.findIndex(
        (conversation) => conversation._id === action.payload._id
      );
      if (index) state.conversations[index] = action.payload;
      else {
        state.conversations = [...state.conversations, action.payload].sort(
          (a, b) => (a.name > b.name ? 1 : -1)
        );
      }
    },
  },
});

export const {
  fetchConversations,
  setConversations,
  setConversationsLoadingState,
  addOneConversation,
} = conversationsSlice.actions;
export default conversationsSlice.reducer;
