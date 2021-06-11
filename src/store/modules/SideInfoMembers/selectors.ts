import { IRootState } from "../../store";

export const selectSideInfoMembersState = (state: IRootState) =>
  state.sideInfoMembers;

export const selectSideInfoMembers = (state: IRootState) =>
  selectSideInfoMembersState(state).members;

export const selectSideInfoMembersLoadingState = (state: IRootState) =>
  selectSideInfoMembersState(state).loadingState;
