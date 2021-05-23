import { IRootState } from "../../store";

export const selectCurrentInfoState = (state: IRootState) =>
  state.currentInfo;

export const selectCurrentInfoItem = (state: IRootState) =>
selectCurrentInfoState(state).item;

export const selectCurrentInfoItemType = (state: IRootState) =>
selectCurrentInfoState(state).type;