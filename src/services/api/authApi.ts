import { IEditProfileForm } from "./../../components/EditProfileModal";
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
    const response = await axios.post<IResponse<IUser>>(`/api/auth/register`, {
      name,
      email,
      password,
      password2,
    });
    return response.data.data;
  },
  async getMe(): Promise<IUser> {
    const response = await axios.get<IResponse<IUser>>(`/api/auth/me`);
    return response.data.data;
  },
  async updateProfile({
    name,
    display_name,
    work,
    phone,
  }: IEditProfileForm): Promise<IUser> {
    const response = await axios.post<IResponse<IUser>>(`/api/auth/update`, {
      name,
      display_name,
      work,
      phone,
    });
    return response.data.data;
  },
  async updateAvatar(avatar: string): Promise<IUser> {
    const response = await axios.post<IResponse<IUser>>(`/api/auth/update`, {
      avatar,
    });
    return response.data.data;
  },

  async updateIsAway(away: boolean): Promise<IUser> {
    const response = await axios.post<IResponse<IUser>>(`/api/auth/update`, {
      away,
    });
    return response.data.data;
  },

  async logout(): Promise<boolean> {
    const response = await axios.post<IResponse<boolean>>(`/api/auth/logout`);
    return response.data.data;
  },
};
