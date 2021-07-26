import { LoadingUserState } from "../../../store/modules/user/types";
import { store } from "../../../store/store";
import {
  selectUserState,
  selectUser,
  selectUserLoadingState,
} from "../../../store/modules/user/selectors";
import { initialState } from "../../../store/modules/user/user";

const state = { ...initialState };
const globalState = store.getState();

describe("user selectors tests", () => {
  it("selectUserState should return user state", () => {
    expect(selectUserState(globalState)).toEqual(state);
  });
  it("selectUser should return user", () => {
    expect(selectUser(globalState)).toEqual(null);
  });
  it("selectUserLoadingState should return user loading state", () => {
    expect(selectUserLoadingState(globalState)).toEqual(LoadingUserState.NEVER);
  });
});
