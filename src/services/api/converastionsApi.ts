import axios from "axios"; 
import { IConversation } from "../../store/modules/conversations/types";
import { IResponse } from "./types";

export const conversationsApi = {
    async fetchConversations (): Promise<IConversation[] | []> {
        const response = await axios.get<IResponse<IConversation[] | []>>(`/api/conversations`);
        return response.data.data
    },
    async fetchCurrentConversation (id: string): Promise<IConversation> {
        const response = await axios.get<IResponse<IConversation>>(`/api/conversations/${id}`);
        return response.data.data
    },
    async fetchConversationWithPopulate (id: string): Promise<IConversation> {
        const response = await axios.get<IResponse<IConversation>>(`/api/conversations/populated/${id}`);
        return response.data.data
    },
    async createChannel (name: string): Promise<IConversation> {
        const response = await axios.post<IResponse<IConversation>>(`/api/conversations/`, {
            name: name,
            isChannel: true
        });
        console.log(response)
        return response.data.data
    },
    async createDirectMessage (name: string, id: string): Promise<IConversation> {
        const response = await axios.post<IResponse<IConversation>>(`/api/conversations/`, {
            name: name,
            isChannel: false,
            id: id
        });
        console.log(response)
        return response.data.data
    },
}