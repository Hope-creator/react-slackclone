import { IUser } from "./../user/types";
import { IConversation } from "./../conversations/types";
import { ISearchState, LoadingSearchState, SearchItemType } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pathesCustomNamesArray } from "../../../constants";

const initialState = {
  search: "",
  pageUsers: 1,
  pageConversations: 1,
  count: 5,
  results: [],
  totalCountUsers: 20,
  totalCountConversations: 20,
  totalCount: 10,
  resultsConversations: [],
  resultsUsers: [],
  resultsCustom: [],
  loadingState: LoadingSearchState.NEVER,
} as ISearchState;

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    fetchSearchConversations(state) {
      state.loadingState = LoadingSearchState.LOADING;
    },
    fetchSearchUsers(state) {
      state.loadingState = LoadingSearchState.LOADING;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.pageUsers = 1;
      state.pageConversations = 1;
      state.totalCountUsers = 20;
      state.totalCountConversations = 20;
      state.totalCount = 10;
      state.search = action.payload;
      const regExpPayload = new RegExp(action.payload, "gi");
      const customResults = pathesCustomNamesArray.filter((name) =>
        name.match(regExpPayload)
      );
      const customs = customResults.map((custom) => ({
        item: custom,
        type: SearchItemType.CUSTOM,
      }));
      state.results = customs;
    },
    setResultsUsers(state, action: PayloadAction<IUser[]>) {
      const items = action.payload.map((user) => ({
        item: user,
        type: SearchItemType.USER,
      }));
      state.results = [...state.results, ...items];
    },
    setResultsConversations(state, action: PayloadAction<IConversation[]>) {
      const items = action.payload.map((conversation) => ({
        item: conversation,
        type: SearchItemType.CONVERSATION,
      }));
      state.results = [...state.results, ...items];
    },
    setSearchLoadingState(state, action: PayloadAction<LoadingSearchState>) {
      state.loadingState = action.payload;
    },
    setPageSearchUsers(state, action: PayloadAction<number>) {
      state.pageUsers = action.payload;
    },
    setPageSearchConversations(state, action: PayloadAction<number>) {
      state.pageConversations = action.payload;
    },
    setCountSearch(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setTotalCountSearchUsers(state, action: PayloadAction<number>) {
      state.totalCountUsers = action.payload;
    },
    setTotalCountSearchConversations(state, action: PayloadAction<number>) {
      state.totalCountConversations = action.payload;
    },
    setTotalCountSearch(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    clearSearchState() {
      return initialState;
    },
  },
});

export const {
  fetchSearchConversations,
  fetchSearchUsers,
  setSearch,
  setResultsUsers,
  setSearchLoadingState,
  clearSearchState,
  setPageSearchUsers,
  setPageSearchConversations,
  setCountSearch,
  setResultsConversations,
  setTotalCountSearchUsers,
  setTotalCountSearchConversations,
  setTotalCountSearch,
} = searchSlice.actions;
export default searchSlice.reducer;
