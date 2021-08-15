import { authApi } from "../../../services/api/authApi";
import { uploadApi } from "../../../services/api/uploadApi";
import { call } from "redux-saga/effects";
import {
  fetchMe,
  fetchUser,
  setUser,
  setUserLoadingState,
  createUser,
  updateProfile,
  updateAvatar,
  removeAvatar,
  updateIsAway,
  logoutUser,
  clearUserState,
} from "../../../store/modules/user/user";
import { userSaga } from "../../../store/modules/user/operations";
import { expectSaga } from "redux-saga-test-plan";
import { LoadingUserState } from "../../../store/modules/user/types";
import { throwError } from "redux-saga-test-plan/providers";
import * as matchers from "redux-saga-test-plan/matchers";
import { fakeUser } from "../../utils/fakes";

describe("User sagas tests", () => {
  describe("fetchMeSaga tests", () => {
    it("should call api and set user on good response", async () => {
      return expectSaga(userSaga)
        .provide([[call(authApi.getMe), fakeUser]])
        .put(setUser(fakeUser))
        .dispatch(fetchMe())
        .silentRun();
    });
    it("should call api and dispatch error on error response", async () => {
      return expectSaga(userSaga)
        .provide([[call(authApi.getMe), throwError()]])
        .put(setUserLoadingState(LoadingUserState.NEVER))
        .dispatch(fetchMe())
        .silentRun();
    });
  });
  describe("fetchUserSaga tests", () => {
    it("should call api and login", async () => {
      return expectSaga(userSaga)
        .provide([
          [
            call(authApi.signIn, { email: "Test@mail.com", password: "Test" }),
            fakeUser,
          ],
        ])
        .put(setUser(fakeUser))
        .put(setUserLoadingState(LoadingUserState.LOADED))
        .dispatch(fetchUser({ email: "Test@mail.com", password: "Test" }))
        .silentRun();
    });
    it("should call api and dispatch error login on error response", async () => {
      return expectSaga(userSaga)
        .provide([[matchers.call.fn(authApi.signIn), throwError()]])
        .put(setUserLoadingState(LoadingUserState.ERRORLOGIN))
        .dispatch(fetchUser({ email: "Test@mail.com", password: "Test" }))
        .silentRun();
    });
  });
  describe("updateProfileSaga tests", () => {
    it("should call api and set updated user profile", async () => {
      return expectSaga(userSaga)
        .provide([[call(authApi.updateProfile, { name: "Test" }), fakeUser]])
        .put(setUser(fakeUser))
        .put(setUserLoadingState(LoadingUserState.LOADED))
        .dispatch(updateProfile({ name: "Test" }))
        .silentRun();
    });
    it("should call api and dispatch error update on bad response", async () => {
      const error = new Error("error");
      return expectSaga(userSaga)
        .provide([[matchers.call.fn(authApi.updateProfile), throwError(error)]])
        .put(setUserLoadingState(LoadingUserState.ERRORUPDATE))
        .dispatch(updateProfile({ name: "Test" }))
        .silentRun();
    });
  });
  describe("updateProfileAvatarSaga tests", () => {
    it("should call upload api, get src from upload and set src to user avatar,then set new user info with avatar", async () => {
      const avatarSrc = "some-src.com";
      const fakeUserWithAvatar = { ...fakeUser, avatar: avatarSrc };
      return expectSaga(userSaga)
        .provide([
          [matchers.call.fn(uploadApi.uploadAvatar), avatarSrc],
          [matchers.call.fn(authApi.updateAvatar), fakeUserWithAvatar],
        ])
        .put(setUser(fakeUserWithAvatar))
        .put(setUserLoadingState(LoadingUserState.LOADED))
        .dispatch(updateAvatar(new FormData()))
        .silentRun();
    });
    it("should call api and set error update on bad request", async () => {
      return expectSaga(userSaga)
        .provide([
          [matchers.call.fn(uploadApi.uploadAvatar), throwError()],
          [matchers.call.fn(authApi.updateAvatar), throwError()],
        ])
        .put(setUserLoadingState(LoadingUserState.ERRORUPDATE))
        .dispatch(updateAvatar(new FormData()))
        .silentRun();
    });
  });
  describe("updateProfileIsAwaySaga tests", () => {
    it("should call api set user with new isAwat status", async () => {
      return expectSaga(userSaga)
        .provide([[matchers.call.fn(authApi.updateIsAway), fakeUser]])
        .put(setUser(fakeUser))
        .put(setUserLoadingState(LoadingUserState.LOADED))
        .dispatch(updateIsAway(false))
        .silentRun();
    });
    it("should call api and dispatch error update on bad request", async () => {
      return expectSaga(userSaga)
        .provide([[matchers.call.fn(authApi.updateIsAway), throwError()]])
        .put(setUserLoadingState(LoadingUserState.ERRORUPDATE))
        .dispatch(updateIsAway(false))
        .silentRun();
    });
  });
  describe("removeProfileAvatarSaga tests", () => {
    it("should call api and set new profile with empty avatar field", async () => {
      return expectSaga(userSaga)
        .provide([[matchers.call.fn(authApi.updateAvatar), fakeUser]])
        .put(setUser(fakeUser))
        .put(setUserLoadingState(LoadingUserState.LOADED))
        .dispatch(removeAvatar())
        .silentRun();
    });
    it("should call api and set error update on bad request", async () => {
      return expectSaga(userSaga)
        .provide([[matchers.call.fn(authApi.updateAvatar), throwError()]])
        .put(setUserLoadingState(LoadingUserState.ERRORUPDATE))
        .dispatch(removeAvatar())
        .silentRun();
    });
  });
  describe("createUserSaga tests", () => {
    it("should call api and set user on registation", async () => {
      return expectSaga(userSaga)
        .provide([[matchers.call.fn(authApi.signUp), fakeUser]])
        .put(setUser(fakeUser))
        .dispatch(
          createUser({
            name: "Test",
            email: "Test@mail.com",
            password: "Test",
            password2: "Test",
          })
        )
        .silentRun();
    });
    it("should call api and dispatch email is already taken error action", async () => {
      const error = new Error(
        "Failed to load resource: the server responded with a status of 409 (Conflict)"
      );
      return expectSaga(userSaga)
        .provide([[matchers.call.fn(authApi.signUp), throwError(error)]])
        .put(setUserLoadingState(LoadingUserState.ERROREMAIL))
        .dispatch(
          createUser({
            name: "Test",
            email: "Test@mail.com",
            password: "Test",
            password2: "Test",
          })
        )
        .silentRun();
    });
    it("should call api and dispatch something got wrong error action", async () => {
      const error = new Error("Network error 500");
      return expectSaga(userSaga)
        .provide([[matchers.call.fn(authApi.signUp), throwError(error)]])
        .put(setUserLoadingState(LoadingUserState.ERROR))
        .dispatch(
          createUser({
            name: "Test",
            email: "Test@mail.com",
            password: "Test",
            password2: "Test",
          })
        )
        .silentRun();
    });
  });
  describe("logoutUserSaga tests", () => {
    it("should call api and logout user on true response", async () => {
      return expectSaga(userSaga)
        .provide([[matchers.call.fn(authApi.logout), true]])
        .put(clearUserState())
        .dispatch(logoutUser())
        .silentRun();
    });
    it("should call api and not doing anything on false response", async () => {
      return expectSaga(userSaga)
        .provide([[matchers.call.fn(authApi.logout), false]])
        .dispatch(logoutUser())
        .silentRun();
    });
    it("should call api and console log error if api request fails", async () => {
      return expectSaga(userSaga)
        .provide([[matchers.call.fn(authApi.logout), throwError()]])
        .dispatch(logoutUser())
        .silentRun();
    });
  });
});
