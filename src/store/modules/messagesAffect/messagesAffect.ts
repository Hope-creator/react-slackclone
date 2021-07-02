import { IMessage } from "../messages/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessagesAffectState } from "./types";

const initialState = {
  fetchingMessages: [],
  errorMessages: [],
} as IMessagesAffectState;

const messagesAffectSlicer = createSlice({
  name: "messagesAffect",
  initialState,
  reducers: {
    fetchReadMessage(state, action: PayloadAction<string>) {
      const index = state.errorMessages.indexOf(action.payload);
      if (index !== -1) state.errorMessages.splice(index, 1);
      state.fetchingMessages.push(action.payload);
    },
    fetchDeleteMessage(state, action: PayloadAction<string>) {
      const index = state.errorMessages.indexOf(action.payload);
      if (index !== -1) state.errorMessages.splice(index, 1);
      state.fetchingMessages.push(action.payload);
    },
    fetchReadingAllMessagesUnread(state, action: PayloadAction<IMessage[]>) {
      state.errorMessages = [];
      state.fetchingMessages = action.payload.map((message) => message._id);
    },
    setErrorMessages(state, action: PayloadAction<IMessage[]>) {
      state.fetchingMessages = [];
      state.errorMessages = action.payload.map((message) => message._id);
    },
    setMessageAffectSuccess(state, action: PayloadAction<string>) {
      const index = state.fetchingMessages.indexOf(action.payload);
      if (index !== -1) state.fetchingMessages.splice(index, 1);
    },
    setMessageAffectError(state, action: PayloadAction<string>) {
      const index = state.fetchingMessages.indexOf(action.payload);
      if (index !== -1) {
        state.fetchingMessages.splice(index, 1);
      }
      state.errorMessages.push(action.payload);
    },
    clearReadMessageState() {
      return initialState;
    },
  },
});

export const {
  fetchReadMessage,
  fetchDeleteMessage,
  setMessageAffectSuccess,
  setMessageAffectError,
  fetchReadingAllMessagesUnread,
  setErrorMessages,
  clearReadMessageState,
} = messagesAffectSlicer.actions;
export default messagesAffectSlicer.reducer;
