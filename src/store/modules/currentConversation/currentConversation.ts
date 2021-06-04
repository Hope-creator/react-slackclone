import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConversation } from "../conversations/types";
import {
  ICurrentConversationState,
  LoadingCurrentConversationState,
} from "./types";

const initialState = {
  currentConversation: undefined,
  //messages: [],
  loadingState: LoadingCurrentConversationState.NEVER,
 // loadingSendMessageState: LoadingSendMessageState.NEVER,
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
   /* setMessages(state, action: PayloadAction<IMessage[] | []>) {
      state.messages = [...action.payload];
    },
    sendNewMessage(state, action: PayloadAction<ISendMessageForm>) {
      state.loadingSendMessageState = LoadingSendMessageState.LOADING;
    },
    setSendNewMessageState(
      state,
      action: PayloadAction<LoadingSendMessageState>
    ) {
      state.loadingSendMessageState = action.payload;
    },*/
    //markMessage(state, action: PayloadAction<string>) {}, // Action for saga
    /*markMessageInState(state, action: PayloadAction<string>) {
      const index = state.messages.findIndex(
        (message) => message._id === action.payload
      );
      state.messages[index].marked = true;
    },*/
   /* unmarkMessage(state, action: PayloadAction<string>) {}, // Action for saga
    unmarkMessageInState(state, action: PayloadAction<string>) {
      const index = state.messages.findIndex(
        (message) => message._id === action.payload
      );
      state.messages[index].marked = false;
    },*/
  /*changeMessage(state, action: PayloadAction<IMessage>) {
      const index = state.messages.findIndex(
        (message) => message._id === action.payload._id
      );
      state.messages[index] = action.payload;
    },
    addNewMessage(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload);
    },*/
    clearCurrentConversation() {
      return initialState;
    },
  },
});

export const {
  fetchCurrentConversation,
  setCurrentConversation,
  setCurrentConversationLoadingState,
  //setMessages,
  clearCurrentConversation,
  /*addNewMessage,
  sendNewMessage,
  setSendNewMessageState,
  markMessage,
  markMessageInState,
  unmarkMessage,
  unmarkMessageInState,
  changeMessage*/
} = currentConversationSlicer.actions;
export default currentConversationSlicer.reducer;
