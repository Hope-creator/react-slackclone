import { IUser } from './../../store/modules/user/types';
import axios from "axios"; 

export interface IResponse<T> {
    status: string,
    data: T
}

export const userApi = {
    async fetchUser (id: string): Promise<IUser> {
        const response = await axios.get<IResponse<IUser>>(`/api/users/${id}`);
        return response.data.data
    }
}