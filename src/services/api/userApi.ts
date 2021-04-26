import { IUser } from './../../store/modules/user/types';
import axios from "axios"; 

export const userApi = {
    async fetchUser (): Promise<IUser> {
        const response = await axios.get('https://trycode.pw/c/LMBRJ.json');
        return response.data
    }
}