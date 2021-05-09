import { IUser } from './../../store/modules/user/types';
import axios from "axios"; 
import { IResponse } from './types';

export const userApi = {
    async fetchUser (id: string): Promise<IUser> {
        const response = await axios.get<IResponse<IUser>>(`/api/users/${id}`);
        return response.data.data
    }
}