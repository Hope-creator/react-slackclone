import { IRootState } from "../../store";
import { LoadingCurrentConversationsState } from "./types";

export const selectCurrentConversationsState = (state: IRootState) =>
  state.currentConversations;

export const selectCurrentConversations = (state: IRootState) =>
  selectCurrentConversationsState(state).conversations;

export const selectCurrentConversationsPage = (state: IRootState) =>
  selectCurrentConversationsState(state).page;

export const selectCurrentConversationsSearchName = (state: IRootState) =>
  selectCurrentConversationsState(state).searchName;

export const selectCurrentConversationsCount = (state: IRootState) =>
  selectCurrentConversationsState(state).count;

export const selectCurrentConversationsTotalCount = (state: IRootState) =>
  selectCurrentConversationsState(state).totalCount;

export const selectCurrentConversationsLoadingState = (state: IRootState) =>
  selectCurrentConversationsState(state).loadingState;

export const selectIsCurrentConversationsLoaded = (state: IRootState) =>
  selectCurrentConversationsState(state).loadingState ===
  LoadingCurrentConversationsState.LOADED;
