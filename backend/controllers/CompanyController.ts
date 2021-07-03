import express from "express";
import { CompanyModel } from "../models/CompanyModel";

class CompanyController {

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const company = await CompanyModel.findOne({_id: "T01TE7T5WEV"});
      console.log(company)
      if (company) {
        res.json({
          status: "success",
          data: company,
        });
      } else {
        const createCompany = await CompanyModel.create({});
        if(createCompany) {
          console.log("CREAT",createCompany)
          res.json({
            status: "success",
            data: createCompany,
          });
        } else {
          res.json({
            status: "error",
            data: false,
          });
        }
        
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on CompanyController / show:", error);
    }
  }
}

export default CompanyController;
