import { IRootState } from "../../store";
import { createSelector } from "reselect";

export const selectConversationsAccessState = (state: IRootState) =>
  state.conversationsAccess;

export const selectFetchingAccessConversations = (state: IRootState) =>
  selectConversationsAccessState(state).fetchingConversations;

export const selectErrorAccessConversations = (state: IRootState) =>
  selectConversationsAccessState(state).errorConversations;

export const selectConversationsAccessLoadingState = (state: IRootState) =>
  selectConversationsAccessState(state).loadingState;

export const selectIsConversationsAccessFetching = (conv: string) => {
  return createSelector(selectFetchingAccessConversations, (items) =>
    items.includes(conv)
  );
};

export const selectIsConversationsAccessError = (conv: string) => {
  return createSelector(selectErrorAccessConversations, (items) =>
    items.includes(conv)
  );
};
