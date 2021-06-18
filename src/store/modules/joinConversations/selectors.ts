import { IRootState } from "../../store";
import { createSelector } from "reselect";

export const selectJoinConversationsState = (state: IRootState) =>
  state.joinConversations;

export const selectFetchingJoinConversations = (state: IRootState) =>
  selectJoinConversationsState(state).fetchingConversations;

export const selectErrorJoinConversations = (state: IRootState) =>
  selectJoinConversationsState(state).errorConversations;

export const selectJoinConversationsLoadingState = (state: IRootState) =>
  selectJoinConversationsState(state).loadingState;

export const selectIsConversationsJoinFetching = (conv: string) => {
  return createSelector(selectFetchingJoinConversations, (items) =>
    items.includes(conv)
  );
};

export const selectIsConversationsJoinError = (conv: string) => {
  return createSelector(selectErrorJoinConversations, (items) =>
    items.includes(conv)
  );
};
