import { IRootState } from "../../store";

export const selectReadMessageState = (state: IRootState) => state.readMessage;

export const selectFetchingReadMessages = (state: IRootState) =>
  selectReadMessageState(state).fetchingMessages;

export const selectErrorReadMessages = (state: IRootState) =>
  selectReadMessageState(state).errorMessages;
