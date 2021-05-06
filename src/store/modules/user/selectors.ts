import { IRootState } from "../../store";

export const selectUserState = (state: IRootState) => state.user;

export const selectUser = (state: IRootState) => selectUserState(state).user;

export const selectUserLoadingState = (state: IRootState) => selectUserState(state).loadingState;