import { LoadingUserState } from "./types";
import { IRootState } from "../../store";

export const selectUserState = (state: IRootState) => state.user;

export const selectUser = (state: IRootState) => selectUserState(state).user;

export const selectUserLoading = (state: IRootState) =>
  selectUserState(state).loadingState === LoadingUserState.LOADING;

export const selectIsUserLoaded = (state: IRootState) =>
  selectUserState(state).loadingState === LoadingUserState.LOADED;

export const selectIsUserNeverLoaded = (state: IRootState) =>
  selectUserState(state).loadingState === LoadingUserState.NEVER;
