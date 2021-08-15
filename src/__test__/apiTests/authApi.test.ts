import { authApi } from "../../services/api/authApi";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { IEditProfileForm } from "../../components/EditProfileModal";
import { ILoginForm } from "../../components/SignInForm";
import { IGetStartedForm } from "../../components/GetStartedForm";
import { fakeUser } from "../utils/fakes";

interface IUpdateProfileApiTestRequst extends IEditProfileForm {
  avatar: string;
  away: string;
}

const testCall = jest.fn();
const handlers = [
  rest.post<ILoginForm>("/api/auth/login", async (req, res, ctx) => {
    const { email, password } = req.body;
    testCall();
    if (email === fakeUser.email && password === "Test") {
      return res(ctx.json({ status: "success", data: fakeUser }));
    }
  }),
  rest.post<IGetStartedForm>("/api/auth/register", async (req, res, ctx) => {
    const { name, email, password, password2 } = req.body;
    testCall();
    if (password === password2) {
      const createdUser = { ...fakeUser, name, email };
      return res(ctx.json({ status: "success", data: createdUser }));
    }
  }),
  rest.get("/api/auth/me", async (req, res, ctx) => {
    testCall();
    return res(ctx.json({ status: "success", data: fakeUser }));
  }),
  rest.post<IUpdateProfileApiTestRequst>(
    "/api/auth/update",
    async (req, res, ctx) => {
      testCall();
      if (req.body.avatar) {
        const updatedUser = { ...fakeUser, avatar: req.body.avatar };
        return res(ctx.json({ status: "success", data: updatedUser }));
      } else if (req.body.away) {
        const updatedUser = { ...fakeUser, away: req.body.away };
        return res(ctx.json({ status: "success", data: updatedUser }));
      } else {
        const { name, phone, work, display_name } = req.body;
        const updatedUser = {
          ...fakeUser,
          name,
          phone,
          work,
          display_name,
        };
        return res(ctx.json({ status: "success", data: updatedUser }));
      }
    }
  ),
  rest.post("/api/auth/logout", async (req, res, ctx) => {
    testCall();
    return res(ctx.json({ status: "success", data: true }));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});

describe("authApi tests", () => {
  describe("signIn tests", () => {
    it("should call api with given email & password and return logged user", async () => {
      const data = {
        email: "Test@mail.com",
        password: "Test",
      };
      const response = await authApi.signIn(data);
      expect(testCall).toHaveBeenCalled();
      expect(response).toStrictEqual(fakeUser);
    });
  });
  describe("signUp tests", () => {
    it("should call api with given user registration form and return registered user", async () => {
      const data = {
        name: "Test",
        email: "Test@mail.com",
        password: "Test",
        password2: "Test",
      };
      const response = await authApi.signUp(data);
      expect(testCall).toHaveBeenCalled();
      expect(response).toStrictEqual({
        ...fakeUser,
        name: data.name,
        email: data.email,
      });
    });
  });
  describe("getMe tests", () => {
    it("should call api and reseive user", async () => {
      const response = await authApi.getMe();
      expect(testCall).toHaveBeenCalled();
      expect(response).toStrictEqual(fakeUser);
    });
  });
  describe("updateProfile tests", () => {
    it("should call api and reseive updated user", async () => {
      const updateData = {
        name: "Testupdate",
        phone: 123123123,
        work: "Testing",
        display_name: " Some_tester",
      };
      const response = await authApi.updateProfile(updateData);
      expect(testCall).toHaveBeenCalled();
      expect(response).toEqual({ ...fakeUser, ...updateData });
    });
  });
  describe("updateAvatar tests", () => {
    it("should call api and reseive updated with avatar", async () => {
      const avatarSrc = "some-src.com";
      const response = await authApi.updateAvatar(avatarSrc);
      expect(testCall).toHaveBeenCalled();
      expect(response).toEqual({ ...fakeUser, avatar: avatarSrc });
    });
  });
  describe("updateIsAway tests", () => {
    it("should call api and reseive updated user with true away field", async () => {
      const response = await authApi.updateIsAway(true);
      expect(testCall).toHaveBeenCalled();
      expect(response).toEqual({ ...fakeUser, away: true });
    });
  });
  describe("logout tests", () => {
    it("should call api , on server session will be ended and response true", async () => {
      const response = await authApi.logout();
      expect(testCall).toHaveBeenCalled();
      expect(response).toEqual(true);
    });
  });
});
