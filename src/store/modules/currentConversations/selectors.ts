import { IRootState } from "../../store";

export const selectCurrentConversationsState = (state: IRootState) =>
  state.currentConversations;

export const selectCurrentConversations = (state: IRootState) =>
  selectCurrentConversationsState(state).conversations;

export const selectCurrentConversationsLoadingState = (state: IRootState) =>
  selectCurrentConversationsState(state).loadingState;
