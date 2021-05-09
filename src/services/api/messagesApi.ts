import axios from "axios"; 
import { IMessage } from "../../store/modules/messages/types";
import { IResponse } from "./types";

export const messagesApi = {
    async fetchMessages (id: string): Promise<IMessage[] | []> {
        const response = await axios.get<IResponse<IMessage[] | []>>(`/api/conversations/${id}`);
        return response.data.data
    },
}