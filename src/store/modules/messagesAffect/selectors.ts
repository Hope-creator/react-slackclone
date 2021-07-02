import { createSelector } from "reselect";
import { IRootState } from "../../store";

export const selectMessagesAffectState = (state: IRootState) =>
  state.messagesAffect;

export const selectFetchingAffectMessages = (state: IRootState) =>
  selectMessagesAffectState(state).fetchingMessages;

export const selectIsFetchingAffectMessage = (messageId: string) => {
  return createSelector(selectFetchingAffectMessages, (messagesIds) =>
    messagesIds.includes(messageId)
  );
};

export const selectErrorAffectMessages = (state: IRootState) =>
  selectMessagesAffectState(state).errorMessages;

export const selectIsErrorAffectMessage = (messageId: string) => {
  return createSelector(selectErrorAffectMessages, (messagesIds) =>
    messagesIds.includes(messageId)
  );
};
