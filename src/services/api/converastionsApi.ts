import axios from "axios"; 
import { IConversation } from "../../store/modules/conversations/types";
import { IResponse } from "./types";

export const conversationsApi = {
    async fetchConversations (): Promise<IConversation[] | []> {
        const response = await axios.get<IResponse<IConversation[] | []>>(`/api/conversations`);
        return response.data.data
    },
    async fetchCurrentConversation (): Promise<IConversation[] | []> {
        const response = await axios.get<IResponse<IConversation[] | []>>(`/api/conversations`);
        return response.data.data
    },
}