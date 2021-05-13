import axios from "axios"; 
import { IMessage } from "../../store/modules/currentConversation/types";
import { IResponse } from "./types";

export const messagesApi = {
    async fetchMessages (id: string): Promise<IMessage[] | []> {
        const response = await axios.get<IResponse<IMessage[] | []>>(`/api/messages/${id}`);
        return response.data.data
    },
}