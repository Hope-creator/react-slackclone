import reducer, {
  fetchUser,
  setUser,
  removeAvatar,
  setUserLoadingState,
  fetchMe,
  updateProfile,
  updateAvatar,
  updateIsAway,
  createUser,
  addUserConversation,
  removeUserConversation,
  clearUserState,
  initialState,
} from "../../../store/modules/user/user";
import { LoadingUserState } from ".../../../src/store/modules/user/types";

const dummyUser = {
  away: false,
  company: { name: "My new company", _id: "T01TE7T5WEV" },
  conversations: [],
  createdAt: "2021-07-20T11:35:09.725Z",
  email: "Test@mail.ru",
  is_admin: true,
  name: "Test",
  online: false,
  updatedAt: "2021-07-20T11:35:09.725Z",
  _id: "60f6b4ed0acbf2002bb5d29b",
};

describe("user slicer tests", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, clearUserState)).toEqual({
      user: null,
      loadingState: "NEVER",
    });
  });

  it("fetchMe should change loading state to loading", () => {
    const previousState = { ...initialState };
    expect(reducer(previousState, fetchMe())).toEqual({
      user: null,
      loadingState: LoadingUserState.LOADING,
    });
  });
  it("fetchUser should change loading state to loadinglogin", () => {
    const previousState = { ...initialState };
    expect(
      reducer(
        previousState,
        fetchUser({ email: "Test@mail.com", password: "Test" })
      )
    ).toEqual({
      user: null,
      loadingState: LoadingUserState.LOADINGLOGIN,
    });
  });
  it("updateProfile should change loading state to loadingupdate", () => {
    const previousState = { ...initialState };
    expect(reducer(previousState, updateProfile({ name: "TestName" }))).toEqual(
      {
        user: null,
        loadingState: LoadingUserState.LOADINGUPDATE,
      }
    );
  });
  it("updateAvatar should change loading state to loadingupdate", () => {
    const previousState = { ...initialState };
    expect(reducer(previousState, updateAvatar(new FormData()))).toEqual({
      user: null,
      loadingState: LoadingUserState.LOADINGUPDATE,
    });
  });
  it("updateIsAway should change loading state to loadingupdate", () => {
    const previousState = { ...initialState };
    expect(reducer(previousState, updateIsAway(false))).toEqual({
      user: null,
      loadingState: LoadingUserState.LOADINGUPDATE,
    });
  });
  it("removeAvatar should change loading state to loadingupdate", () => {
    const previousState = { ...initialState };
    expect(reducer(previousState, removeAvatar())).toEqual({
      user: null,
      loadingState: LoadingUserState.LOADINGUPDATE,
    });
  });
  it("createUser should change loading state to loadingcreate", () => {
    const previousState = { ...initialState };
    expect(
      reducer(
        previousState,
        createUser({
          name: "TestName",
          email: "Test@mail.com",
          password: "Test",
          password2: "Test",
        })
      )
    ).toEqual({
      user: null,
      loadingState: LoadingUserState.LOADINGCREATE,
    });
  });
  it("setUser should change loading state to loaded and set user into state", () => {
    const previousState = { ...initialState };
    expect(reducer(previousState, setUser({ ...dummyUser }))).toEqual({
      user: dummyUser,
      loadingState: LoadingUserState.LOADED,
    });
  });
  it("setUserLoadingState should set loading state to passed loading state", () => {
    const previousState = { ...initialState };
    expect(
      reducer(previousState, setUserLoadingState(LoadingUserState.ERROR))
    ).toEqual({
      user: null,
      loadingState: LoadingUserState.ERROR,
    });
  });
  it("addUserConversation should add conversation id to user conversations array", () => {
    const testId = "test-id";
    const previousState = { ...initialState, user: { ...dummyUser } };
    expect(reducer(previousState, addUserConversation(testId))).toEqual({
      ...initialState,
      user: { ...dummyUser, conversations: [testId] },
    });
  });
  it("removeUserConversation should remove conversation id from user conversations array", () => {
    const testId = "test-id";
    const previousState = {
      ...initialState,
      user: { ...dummyUser, conversations: [testId] },
    };
    expect(reducer(previousState, removeUserConversation(testId))).toEqual({
      ...initialState,
      user: { ...dummyUser, conversations: [] },
    });
  });
});
