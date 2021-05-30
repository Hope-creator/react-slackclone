import axios from "axios";
import { ISendMessageForm } from "../../components/SendMessageForm";
import { IMessage } from "../../store/modules/currentConversation/types";
import { IResponse } from "./types";

export const messagesApi = {
  async fetchMessages(id: string): Promise<IMessage[] | []> {
    const response = await axios.get<IResponse<IMessage[] | []>>(
      `/api/messages/${id}`
    );
    return response.data.data;
  },
  async sendMessage({
    conversationId,
    text,
    attachments,
  }: ISendMessageForm): Promise<IMessage> {
    const response = await axios.post<IResponse<IMessage>>(
      `/api/messages/${conversationId}`,
      {
        text,
        attachments,
      }
    );
    return response.data.data;
  },
  async getUnread(conversationId: string): Promise<number> {
    const response = await axios.get<IResponse<number>>(
      `/api/messages/unread/${conversationId}`
    );
    return response.data.data;
  },
  async markMessage(messageId: string): Promise<boolean> {
    const response = await axios.post<IResponse<boolean>>(`/api/mark`, {
      id: messageId,
    });
    return response.data.data;
  },
  async unmarkMessage(messageId: string): Promise<boolean> {
    const response = await axios.delete<IResponse<boolean>>(
      `/api/mark/${messageId}`
    );
    return response.data.data;
  },
};
