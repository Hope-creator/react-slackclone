import axios from "axios";
import { IResponse } from "./types";

export interface IFile {
    conversation: string;
    filename: string;
    url: string;
    user: string;
    _id: string;
  }
  
export const uploadApi = {
  async uploadFile(data: FormData): Promise<string[]> {
    const response = await axios.post<IResponse<string[]>>(
      `/api/files/upload`, data
    );
    if(!response) throw new Error("Error on upload file");
    return response.data.data;
  },
};
