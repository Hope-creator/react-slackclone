import { IUser } from './../../store/modules/user/types';
import axios from "axios"; 

export const userApi = {
    async fetchUser (): Promise<IUser> {
        const response = await axios.get('http://localhost:5000/user');
        return response.data
    }
}