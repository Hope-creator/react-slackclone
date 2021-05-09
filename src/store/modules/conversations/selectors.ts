import { IRootState } from "../../store";

export const selectConversationsState = (state: IRootState) => state.conversations;

export const selectConversations = (state: IRootState) => selectConversationsState(state).conversations;

export const selectConversationsLoadingState = (state: IRootState) => selectConversationsState(state).loadingState;