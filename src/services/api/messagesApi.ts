import axios from "axios";
import { ISendMessageForm } from "../../components/SendMessageForm";
import { IMessage } from "../../store/modules/messages/types";
import { IResponse } from "./types";

export const messagesApi = {
  async fetchMessages(id: string): Promise<IMessage[] | []> {
    const response = await axios.get<IResponse<IMessage[] | []>>(
      `/api/messages/${id}`
    );
    return response.data.data;
  },
  async fetchDirectMessages(id: string): Promise<IMessage[] | []> {
    const response = await axios.get<IResponse<IMessage[] | []>>(
      `/api/messages/dm/${id}`
    );
    return response.data.data;
  },
  async sendMessage({
    dest,
    text,
    attachments,
  }: ISendMessageForm): Promise<IMessage> {
    const response = await axios.post<IResponse<IMessage>>(
      `/api/messages/${dest}`,
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
  async getUnreadCount(conversationId: string): Promise<number> {
    const response = await axios.get<IResponse<number>>(
      `/api/messages/unread/count/${conversationId}`
    );
    return response.data.data;
  },
  async getAllUnread(): Promise<IMessage[] | []> {
    const response = await axios.get<IResponse<IMessage[] | []>>(
      `/api/messages/unread`
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
  async getMarkMessages(): Promise<IMessage[]> {
    const response = await axios.get<IResponse<IMessage[]>>(
      `/api/messages/mark`
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
};
