import { CompanyModel } from "./models/CompanyModel";

const createCompany = async () => {
    try {
        const company = await CompanyModel.findOne({ _id: "T01TE7T5WEV" });
        if (company) {
            console.log("Company already exists: ", company)
        } else {
            const createdCompany = await CompanyModel.create({});
            if (createdCompany) {
                console.log("Company created: ", createdCompany)
            } else {
                console.log("Something went wrong on create company: ", createdCompany)
            }

        }
    } catch (error) {
        console.log("Error on create company:", error);
    }
}

export default createCompany;
