import { IRootState } from "../../store";

export const selectCurrentDMState = (state: IRootState) => state.currentDM;

export const selectCurrentDMPartner = (state: IRootState) =>
  selectCurrentDMState(state).partner;

export const selectCurrentDMLoadingState = (state: IRootState) =>
  selectCurrentDMState(state).loadingState;
