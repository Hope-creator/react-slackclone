import { IRootState } from "../../store";

export const selectCurrentMembersState = (state: IRootState) =>
  state.currentMembers;

export const selectCurrentMembers = (state: IRootState) =>
  selectCurrentMembersState(state).members;

export const selectCurrentMembersLoadingState = (state: IRootState) =>
  selectCurrentMembersState(state).loadingState;
