import { IRootState } from "../../store";

export const selectUsersState = (state: IRootState) => state.users;

export const selectUsers = (state: IRootState) => selectUsersState(state).users;

export const selectUsersPage = (state: IRootState) =>
  selectUsersState(state).page;

export const selectUsersCount = (state: IRootState) =>
  selectUsersState(state).count;

export const selectUsersTotalCount = (state: IRootState) =>
  selectUsersState(state).totalCount;

export const selectUsersLoadingState = (state: IRootState) =>
  selectUsersState(state).loadingState;
