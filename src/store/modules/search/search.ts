import { IDialog } from "./../dialogs/types";
import { IConversation } from "./../conversations/types";
import { ISearchState, LoadingSearchState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  resultsConversations: [],
  resultsDialogs: [],
  resultsCustom: [],
  loadingState: LoadingSearchState.NEVER,
} as ISearchState;

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.loadingState = LoadingSearchState.LOADING;
    },
    setResultsConversations(state, action: PayloadAction<IConversation[]>) {
      state.resultsConversations = action.payload;
    },
    setResultsDialogs(state, action: PayloadAction<IDialog[]>) {
      state.resultsDialogs = action.payload;
    },
    setResultsCustom(state, action: PayloadAction<string[]>) {
      state.resultsCustom = action.payload;
    },
    setSearchLoadingState(state, action: PayloadAction<LoadingSearchState>) {
      state.loadingState = action.payload;
    },
    clearSearchState() {
      return initialState;
    },
  },
});

export const {
  setSearch,
  setResultsConversations,
  setResultsDialogs,
  setResultsCustom,
  setSearchLoadingState,
  clearSearchState,
} = searchSlice.actions;
export default searchSlice.reducer;