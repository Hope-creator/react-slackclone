import axios from "axios";
import { ISendMessageForm } from "../../components/SendMessageForm";
import { IMessage } from "../../store/modules/messages/types";
import { IPaginationData, IResponse, IResponsePagination } from "./types";

export const messagesApi = {
  async fetchMessages(
    id: string,
    page: number = 1,
    count: number = 40
  ): Promise<IPaginationData<IMessage[]>> {
    const response = await axios.get<IResponsePagination<IMessage[]>>(
      `/api/messages/get/${id}${"?page=" + page + "&count=" + count}`
    );
    return response.data.data;
  },
  async fetchDirectMessages(
    id: string,
    page: number = 1,
    count: number = 40
  ): Promise<IPaginationData<IMessage[]>> {
    const response = await axios.get<IResponsePagination<IMessage[]>>(
      `/api/messages/dm/${id}${"?page=" + page + "&count=" + count}`
    );
    return response.data.data;
  },
  async sendMessage({
    dest,
    text,
    attachments,
  }: ISendMessageForm): Promise<IMessage> {
    const response = await axios.post<IResponse<IMessage>>(
      `/api/messages/create/${dest}`,
      {
        text,
        attachments,
      }
    );
    return response.data.data;
  },
  async sendDirectMessage({
    dest,
    text,
    attachments,
  }: ISendMessageForm): Promise<IMessage> {
    const response = await axios.post<IResponse<IMessage>>(
      `/api/messages/dm/`,
      {
        id: dest,
        text,
        attachments,
      }
    );
    return response.data.data;
  },
  async getUnreadCount(): Promise<number> {
    const response = await axios.get<IResponse<number>>(
      `/api/messages/unread/count`
    );
    return response.data.data;
  },
  async getAllUnread(
    page: number = 1,
    count: number = 40
  ): Promise<IPaginationData<IMessage[]>> {
    const response = await axios.get<IResponsePagination<IMessage[]>>(
      `/api/messages/unread${"?page=" + page + "&count=" + count}`
    );
    return response.data.data;
  },
  async readAll(): Promise<boolean> {
    const response = await axios.patch<IResponse<boolean>>(
      `/api/messages/unread`
    );
    return response.data.data;
  },
  async readAllByConversationId(conversationId: string): Promise<boolean> {
    const response = await axios.patch<IResponse<boolean>>(
      `/api/messages/unread?conversation=${conversationId}`,
      conversationId
    );
    return response.data.data;
  },
  async readOneByMessageId(messageId: string): Promise<boolean> {
    const response = await axios.patch<IResponse<boolean>>(
      `/api/messages/unread/one`,
      { messageId: messageId }
    );
    return response.data.data;
  },
  async getMarkMessages(
    page: number = 1,
    count: number = 40
  ): Promise<IPaginationData<IMessage[]>> {
    const response = await axios.get<IResponsePagination<IMessage[]>>(
      `/api/messages/mark${"?page=" + page + "&count=" + count}`
    );
    return response.data.data;
  },
  async markMessage(messageId: string): Promise<boolean> {
    const response = await axios.post<IResponse<boolean>>(
      `/api/messages/mark`,
      {
        messageId: messageId,
      }
    );
    return response.data.data;
  },
  async unmarkMessage(messageId: string): Promise<boolean> {
    const response = await axios.patch<IResponse<boolean>>(
      `/api/messages/mark`,
      { messageId: messageId }
    );
    return response.data.data;
  },
  async deleteMessage(messageId: string): Promise<IMessage> {
    const response = await axios.post<IResponse<IMessage>>(
      `/api/messages/delete`,
      { messageId: messageId }
    );
    return response.data.data;
  },
};
