import { createSelector } from "reselect";
import { IRootState } from "../../store";
import { LoadingMessagesState } from "./types";

export const selectMessagesState = (state: IRootState) => state.messages;

export const selectMessages = (state: IRootState) =>
  selectMessagesState(state).messages;

export const selectMessagesPage = (state: IRootState) =>
  selectMessagesState(state).page;

export const selectMessagesCount = (state: IRootState) =>
  selectMessagesState(state).count;

export const selectMessagesTotalCount = (state: IRootState) =>
  selectMessagesState(state).totalCount;

export const selectMessagesLoadingState = (state: IRootState) =>
  selectMessagesState(state).loadingState;

export const selectIsMessagesLoaded = (state: IRootState) =>
  selectMessagesState(state).loadingState === LoadingMessagesState.LOADED;

export const selectSendNewMessageLoadingState = (state: IRootState) =>
  selectMessagesState(state).loadingSendMessageState;

export const selectMarkedMessages = createSelector(selectMessages, (messages) =>
  messages.filter((message) => message.marked)
);
