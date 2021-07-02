import { IRootState } from "../../store";

export const selectSearchState = (state: IRootState) => state.search;

export const selectSearch = (state: IRootState) =>
  selectSearchState(state).search;

export const selectSearchedConversations = (state: IRootState) =>
  selectSearchState(state).resultsConversations;

export const selectSearchedUsers = (state: IRootState) =>
  selectSearchState(state).resultsUsers;

export const selectSearchedResult = (state: IRootState) =>
  selectSearchState(state).results;

export const selectSearchedCustoms = (state: IRootState) =>
  selectSearchState(state).resultsCustom;

export const selectSearchPageUsers = (state: IRootState) =>
  selectSearchState(state).pageUsers;

export const selectSearchPageConversations = (state: IRootState) =>
  selectSearchState(state).pageConversations;

export const selectSearchCount = (state: IRootState) =>
  selectSearchState(state).count;

export const selectSearchTotalCount = (state: IRootState) =>
  selectSearchState(state).totalCount;

export const selectSearchTotalCountUsers = (state: IRootState) =>
  selectSearchState(state).totalCountUsers;

export const selectSearchTotalCountConversations = (state: IRootState) =>
  selectSearchState(state).totalCountConversations;

export const selectSearchLoadingState = (state: IRootState) =>
  selectSearchState(state).loadingState;
