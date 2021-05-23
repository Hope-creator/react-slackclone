import axios from "axios";
import { IResponse } from "./types";
import { IUser } from "../../store/modules/user/types";
import { ILoginForm } from "../../components/SignInForm";
import { IGetStartedForm } from "../../components/GetStartedForm";

export const authApi = {
  async signIn({ email, password }: ILoginForm): Promise<IUser> {
    const response = await axios.post<IResponse<IUser>>(`/api/auth/login`, {
      email,
      password,
    });
    return response.data.data;
  },
  async signUp({
    name,
    email,
    password,
    password2,
  }: IGetStartedForm): Promise<IUser> {
    const response = await axios.post<IResponse<IUser>>(
      `/api/auth/register`,
      {
        name,
        email,
        password,
        password2,
      }
    );
    return response.data.data;
  },
  async getMe(): Promise<IUser> {
    const response = await axios.get<IResponse<IUser>>(`/api/auth/me`);
    return response.data.data;
  },
};
