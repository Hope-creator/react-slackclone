import { IUser } from './../../store/modules/user/types';
import axios from "axios"; 
import { IResponse } from './types';

export const userApi = {
    async getUser (id: string): Promise<IUser> {
        const response = await axios.get<IResponse<IUser>>(`/api/users/${id}`);
        return response.data.data
    },
    async getAllUsers (): Promise<IUser[]> {
        const response = await axios.get<IResponse<IUser[]>>(`/api/users`);
        return response.data.data
    },
    async getUsersByNameOrEmail (nameOrEmail: string): Promise<IUser[]> {
        const response = await axios.get<IResponse<IUser[]>>(`/api/users/name/${nameOrEmail}`);
        return response.data.data
    }
}