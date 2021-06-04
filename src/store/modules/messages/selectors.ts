import { IRootState } from "../../store";

export const selectMessagesState = (state: IRootState) => state.messages;

export const selectMessages = (state: IRootState) =>
  selectMessagesState(state).messages;

export const selectMessagesLoadingState = (state: IRootState) =>
  selectMessagesState(state).loadingState;

export const selectSendNewMessageLoadingState = (state: IRootState) =>
  selectMessagesState(state).loadingSendMessageState;
