import axios from "axios";
import { IConversation } from "../../store/modules/conversations/types";
import { IUser } from "../../store/modules/user/types";
import { IPaginationData, IResponse, IResponsePagination } from "./types";

export const conversationsApi = {
  async fetchConversations(
    search: string = "",
    page: number = 1,
    count: number = 20
  ): Promise<IPaginationData<IConversation[] | []>> {
    const response = await axios.get<IResponsePagination<IConversation[] | []>>(
      `/api/conversations${"?page=" + page + "&count=" + count}${
        search && "&search=" + search
      }`
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
        isPrivate: isPrivate,
      }
    );
    return response.data.data;
  },
   async updateConversation(
    conversationId: string,
    name?: string,
    topic?: string,
    description?: string,
    is_private?: boolean
  ): Promise<IConversation | void> {
     const response = await axios.post<IResponse<IConversation>>(
      `/api/conversations/update`,
      {
        id: conversationId,
        name: name,
        topic: topic,
        description: description,
        is_private: is_private,
      }
    )
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
  async joinConversations(conversationId?: string): Promise<string[]> {
    const response = await axios.post<IResponse<string[]>>(
      `/api/conversations/members/join`,
      { id: conversationId }
    );
    return response.data.data;
  },
  async kickMember(conversationId: string, userId: string): Promise<boolean> {
    const response = await axios.post<IResponse<boolean>>(
      `/api/conversations/members/kick`,
      { conversationId: conversationId, userId: userId }
    );
    return response.data.data;
  },
  async leave(conversationId: string): Promise<boolean> {
    const response = await axios.post<IResponse<boolean>>(
      `/api/conversations/members/kick`,
      { conversationId: conversationId }
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
