import axios from "axios"; 
import { IConversation } from "../../store/modules/conversations/types";
import { IResponse } from "./types";

export const conversationsApi = {
    async fetchConversations (): Promise<IConversation[] | []> {
        const response = await axios.get<IResponse<IConversation[] | []>>(`/api/conversations`);
        return response.data.data
    },
    async fetchConversationWithPopulate (id: string): Promise<IConversation> {
        const response = await axios.get<IResponse<IConversation>>(`/api/conversations/populated/${id}`);
        return response.data.data
    },
    async createChannel (name: string, isPrivate: boolean): Promise<IConversation> {
        const response = await axios.post<IResponse<IConversation>>(`/api/conversations/`, {
            name: name,
            isChannel: true,
            isPrivate: isPrivate
        });
        return response.data.data
    },
    async createDirectMessage (id: string): Promise<IConversation> {
        const response = await axios.post<IResponse<IConversation>>(`/api/conversations/`, {
            isChannel: false,
            id: id
        });
        return response.data.data
    },
    async joinAllConversations (): Promise<IConversation[] | []> {
        const response = await axios.patch<IResponse<IConversation[] | []>>(`/api/conversations/joinall`);
        return response.data.data
    },
    async addUsers (conversationId: string, userId?: string): Promise<boolean> {
        console.log(conversationId, userId)
        const response = await axios.patch<IResponse<boolean>>(`/api/conversations/addusers`, {
            conversationId,
            userId
        });
        return response.data.data
    },
}