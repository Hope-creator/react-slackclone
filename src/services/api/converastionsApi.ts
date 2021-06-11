import axios from "axios";
import { IConversation } from "../../store/modules/conversations/types";
import { IUser } from "../../store/modules/user/types";
import { IResponse } from "./types";

export const conversationsApi = {
  async fetchConversations(): Promise<IConversation[] | []> {
    const response = await axios.get<IResponse<IConversation[] | []>>(
      `/api/conversations`
    );
    return response.data.data;
  },
  async fetchConversation(id: string): Promise<IConversation> {
    const response = await axios.get<IResponse<IConversation>>(
      `/api/conversations/${id}`
    );
    return response.data.data;
  },
  async createChannel(
    name: string,
    isPrivate: boolean
  ): Promise<IConversation> {
    const response = await axios.post<IResponse<IConversation>>(
      `/api/conversations/`,
      {
        name: name,
        isChannel: true,
        isPrivate: isPrivate,
      }
    );
    return response.data.data;
  },
  async createDirectMessage(id: string): Promise<IConversation> {
    const response = await axios.post<IResponse<IConversation>>(
      `/api/conversations/`,
      {
        isChannel: false,
        id: id,
      }
    );
    return response.data.data;
  },
  async joinConversations(
    conversationId?: string
  ): Promise<IConversation[] | []> {
    const response = await axios.post<IResponse<IConversation[] | []>>(
      `/api/conversations/members/join`,
      { id: conversationId }
    );
    return response.data.data;
  },
  async addUsers(conversationId: string, userId?: string): Promise<boolean> {
    const response = await axios.post<IResponse<boolean>>(
      `/api/conversations/members/add`,
      {
        conversationId,
        userId,
      }
    );
    return response.data.data;
  },

  async getMembers(conversationId: string): Promise<IUser[]> {
    const response = await axios.get<IResponse<IUser[]>>(
      `/api/conversations/members/${conversationId}`
    );
    return response.data.data;
  },
};
