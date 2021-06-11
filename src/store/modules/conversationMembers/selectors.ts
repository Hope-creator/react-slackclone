import { IRootState } from "../../store";

export const selectConversationMembersState = (state: IRootState) =>
  state.conversationMembers;

export const selectConversationMembers = (state: IRootState) =>
  selectConversationMembersState(state).members;

export const selectConversationsMembersLoadingState = (state: IRootState) =>
  selectConversationMembersState(state).loadingState;
