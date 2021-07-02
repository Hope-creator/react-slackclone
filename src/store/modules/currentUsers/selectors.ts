import { IRootState } from "../../store";
import { LoadingCurrentUsersState } from "./types";

export const selectCurrentUsersState = (state: IRootState) =>
  state.currentUsers;

export const selectCurrentUsers = (state: IRootState) =>
  selectCurrentUsersState(state).users;

export const selectCurrentUsersPage = (state: IRootState) =>
  selectCurrentUsersState(state).page;

export const selectCurrentUsersSearchName = (state: IRootState) =>
  selectCurrentUsersState(state).searchName;

export const selectCurrentUsersCount = (state: IRootState) =>
  selectCurrentUsersState(state).count;

export const selectCurrentUsersTotalCount = (state: IRootState) =>
  selectCurrentUsersState(state).totalCount;

export const selectCurrentUsersLoadingState = (state: IRootState) =>
  selectCurrentUsersState(state).loadingState;

export const selectIsCurrentUsersLoaded = (state: IRootState) =>
  selectCurrentUsersState(state).loadingState ===
  LoadingCurrentUsersState.LOADED;
