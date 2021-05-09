import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage, IMessagesState, LoadingMessagesState } from "./types";

const initialState = { messages: [], loadingState: "NEVER" } as IMessagesState;

const messagessSlice = createSlice({
  name: "Messages",
  initialState,
  reducers: {
    fetchMessages(state, action: PayloadAction<string>) {
      state.loadingState = LoadingMessagesState.LOADED;
    },
    setMessages(state, action: PayloadAction<IMessage[] | []>) {
      state.messages = [...state.messages, ...action.payload];
    },
    setMessagesLoadingState(
      state,
      action: PayloadAction<LoadingMessagesState>
    ) {
      state.loadingState = action.payload;
    },
  },
});

export const { fetchMessages, setMessages, setMessagesLoadingState } = messagessSlice.actions;
export default messagessSlice.reducer;
