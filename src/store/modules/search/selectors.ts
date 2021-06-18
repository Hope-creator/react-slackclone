import { IRootState } from "../../store";

export const selectSearchState = (state: IRootState) => state.search;

export const selectSearch = (state: IRootState) =>
  selectSearchState(state).search;

export const selectSearchedConversations = (state: IRootState) =>
  selectSearchState(state).resultsConversations;

export const selectSearchedDialogs = (state: IRootState) =>
  selectSearchState(state).resultsDialogs;

export const selectSearchedCustoms = (state: IRootState) =>
  selectSearchState(state).resultsCustom;

export const selectSearchLoadingState = (state: IRootState) =>
  selectSearchState(state).loadingState;
