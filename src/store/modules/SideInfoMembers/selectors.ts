import { IRootState } from "../../store";
import { LoadingSideInfoMembersState } from "./types";

export const selectSideInfoMembersState = (state: IRootState) =>
  state.sideInfoMembers;

export const selectSideInfoMembers = (state: IRootState) =>
  selectSideInfoMembersState(state).members;

export const selectSideInfoMembersLoadingState = (state: IRootState) =>
  selectSideInfoMembersState(state).loadingState;

export const selectIsSideInfoMembersLoaded = (state: IRootState) =>
  selectSideInfoMembersState(state).loadingState ===
  LoadingSideInfoMembersState.LOADED;
