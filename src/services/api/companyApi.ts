import { ICompany } from './../../store/modules/company/types';
import axios from "axios"; 

export const companyApi = {
    async fetchCompany (companyId: number): Promise<ICompany> {
        const response = await axios.get(`http://localhost:5000/${companyId}`);
        return response.data.company
    }
}