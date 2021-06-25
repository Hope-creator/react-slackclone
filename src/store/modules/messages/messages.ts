import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISendMessageForm } from "../../../components/SendMessageForm";
import {
  IMessagesState,
  IMessage,
  LoadingMessagesState,
  LoadingSendMessageState,
} from "./types";

const initialState = {
  messages: [],
  page: 0,
  count: 50,
  totalCount: 50,
  loadingState: LoadingMessagesState.NEVER,
  loadingSendMessageState: LoadingSendMessageState.NEVER,
} as IMessagesState;

const messagesSlicer = createSlice({
  name: "messages",
  initialState,
  reducers: {
    fetchMessagesConversation(state, action: PayloadAction<string>) {
      state.loadingState = LoadingMessagesState.LOADING;
    },
    fetchMessagesDialog(state, action: PayloadAction<string>) {
      state.loadingState = LoadingMessagesState.LOADING;
    },
    fetchMessagesUnread(state) {
      state.loadingState = LoadingMessagesState.LOADING;
    },
    fetchMessagesMarked(state) {
      state.loadingState = LoadingMessagesState.LOADING;
    },
    setPageMessages(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCountMessages(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setTotalCountMessages(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setMessagesLoadingState(
      state,
      action: PayloadAction<LoadingMessagesState>
    ) {
      state.loadingState = action.payload;
    },
    setMessages(state, action: PayloadAction<IMessage[] | []>) {
      state.messages = [...state.messages,...action.payload];
    },
    sendNewMessage(state, action: PayloadAction<ISendMessageForm>) {
      state.loadingSendMessageState = LoadingSendMessageState.LOADING;
    },
    sendNewDirectMessage(state, action: PayloadAction<ISendMessageForm>) {
      state.loadingSendMessageState = LoadingSendMessageState.LOADING;
    },
    setSendNewMessageState(
      state,
      action: PayloadAction<LoadingSendMessageState>
    ) {
      state.loadingSendMessageState = action.payload;
    },

    markMessage(state, action: PayloadAction<string>) {}, // Action for saga
    markMessageInState(state, action: PayloadAction<string>) {
      const index = state.messages.findIndex(
        (message) => message._id === action.payload
      );
      state.messages[index].marked = true;
    },
    unmarkMessage(state, action: PayloadAction<string>) {}, // Action for saga
    unmarkMessageInState(state, action: PayloadAction<string>) {
      const index = state.messages.findIndex(
        (message) => message._id === action.payload
      );
      state.messages[index].marked = false;
    },
    readedAllInStateUnread(state) {
      state.messages = [];
    },
    readMessageInState(state, action: PayloadAction<string>) {
      // Unread message can be only in direct messages
      // that means unreadBy can contain only you as user
      // so to make message read just delete 1 contains item in unreadBy
      const index = state.messages.findIndex(
        (message) => message._id === action.payload
      );
      state.messages[index].unreadBy.pop();
    },
    addNewMessage(state, action: PayloadAction<IMessage>) {
      state.messages = [action.payload, ...state.messages]
    },
    clearMessagesState() {
      return initialState;
    },
  },
});

export const {
  fetchMessagesConversation,
  fetchMessagesUnread,
  fetchMessagesMarked,
  setMessages,
  clearMessagesState,
  addNewMessage,
  sendNewMessage,
  sendNewDirectMessage,
  setSendNewMessageState,
  markMessage,
  markMessageInState,
  unmarkMessage,
  setPageMessages,
  setCountMessages,
  setTotalCountMessages,
  unmarkMessageInState,
  readMessageInState,
  setMessagesLoadingState,
  readedAllInStateUnread,
  fetchMessagesDialog,
} = messagesSlicer.actions;
export default messagesSlicer.reducer;
