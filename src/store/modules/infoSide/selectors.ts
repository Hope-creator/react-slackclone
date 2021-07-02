import { IRootState } from "../../store";
import { LoadingInfoSideState } from "./types";

export const selectInfoSideState = (state: IRootState) => state.infoSide;

export const selectInfoSideItem = (state: IRootState) =>
  selectInfoSideState(state).item;

export const selectInfoSideItemType = (state: IRootState) =>
  selectInfoSideState(state).type;

export const selectInfoSideLoadingState = (state: IRootState) =>
  selectInfoSideState(state).loadingState;

export const selectIsInfoSideLoaded = (state: IRootState) =>
  selectInfoSideState(state).loadingState === LoadingInfoSideState.LOADED;
