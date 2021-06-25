import { IUser } from "./../../store/modules/user/types";
import axios from "axios";
import { IPaginationData, IResponse, IResponsePagination } from "./types";

export const userApi = {
  async getUser(id: string): Promise<IUser> {
    const response = await axios.get<IResponse<IUser>>(`/api/users/${id}`);
    return response.data.data;
  },
  async getAllUsers(
    search: string = "",
    page: number = 1,
    count: number = 20
  ): Promise<IPaginationData<IUser[]>> {
    const response = await axios.get<IResponsePagination<IUser[]>>(
      `/api/users${"?page=" + page + "&count=" + count}${
        search && "&search=" + search
      }`
    );
    return response.data.data;
  },
  async getUsersByNameOrEmail(nameOrEmail: string): Promise<IUser[]> {
    const response = await axios.get<IResponse<IUser[]>>(
      `/api/users/name/${nameOrEmail}`
    );
    return response.data.data;
  },
};
