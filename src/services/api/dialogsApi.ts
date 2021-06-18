import axios from "axios";
import { IDialog } from "../../store/modules/dialogs/types";
import { IResponse } from "./types";

export const dialogsApi = {
  async fetchDialogs(search: string = ""): Promise<IDialog[] | []> {
    const response = await axios.get<IResponse<IDialog[] | []>>(
      `/api/dialogs${search && "?search=" + search}`
    );
    return response.data.data;
  },
  async fetchDialog(id: string): Promise<IDialog> {
    const response = await axios.get<IResponse<IDialog>>(`/api/dialogs/${id}`);
    return response.data.data;
  },
  async getDialogId(userId: string): Promise<string> {
    const response = await axios.get<IResponse<string>>(
      `/api/dialogs/getid/${userId}`
    );
    return response.data.data;
  },
  /*async createDialog(userId: string): Promise<IDialog> {
    const response = await axios.post<IResponse<IDialog>>(`/api/dialogs/`, {
      id: userId,
    });
    return response.data.data;
  },*/
};
