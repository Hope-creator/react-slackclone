import { createSelector } from "reselect";
import { IRootState } from "../../store";
import { LoadingConversationsMembersState } from "./types";

export const selectConversationMembersState = (state: IRootState) =>
  state.conversationMembers;

export const selectConversationMembers = (state: IRootState) =>
  selectConversationMembersState(state).members;

export const selectFilteredConversationMembers = (name: string) => {
  return createSelector(selectConversationMembers, (users) =>
    users.filter((user) =>
      name ? user.name.match(new RegExp(name, "gi")) : user
    )
  );
};

export const selectConversationsMembersLoadingState = (state: IRootState) =>
  selectConversationMembersState(state).loadingState;

export const selectIsConversationsMembersLoaded = (state: IRootState) =>
  selectConversationMembersState(state).loadingState ===
  LoadingConversationsMembersState.LOADED;
