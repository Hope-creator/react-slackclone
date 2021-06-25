import { IRootState } from "../../store";

export const selectConversationsState = (state: IRootState) =>
  state.conversations;

export const selectConversations = (state: IRootState) =>
  selectConversationsState(state).conversations;

export const selectConversationsPage = (state: IRootState) =>
  selectConversationsState(state).page;
export const selectConversationsTotalCount = (state: IRootState) =>
  selectConversationsState(state).totalCount;
export const selectConversationsCount = (state: IRootState) =>
  selectConversationsState(state).count;

export const selectConversationsLoadingState = (state: IRootState) =>
  selectConversationsState(state).loadingState;
