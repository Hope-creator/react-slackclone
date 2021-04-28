import { ICompany } from './../../store/modules/company/types';
import axios from "axios"; 

export const companyApi = {
    async fetchCompany (): Promise<ICompany> {
        const response = await axios.get('http://localhost:5000/1313123');
        return response.data.company
    }
}