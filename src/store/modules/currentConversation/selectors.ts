import { IRootState } from "../../store";

export const selectCurrentConversationState = (state: IRootState) =>
  state.currentConversation;

export const selectCurrentConversation = (state: IRootState) =>
  selectCurrentConversationState(state).currentConversation;

export const selectCurrentConversationLoadingState = (state: IRootState) =>
  selectCurrentConversationState(state).loadingState;
