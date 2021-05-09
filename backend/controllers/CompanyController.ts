import express from "express";
import { CompanyModel } from "../models/CompanyModel";

class CompanyController {
  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const companyId = req.params.id;
      const company = await CompanyModel.findById(companyId).exec();
      if (!company) {
        res.status(404).json({ status: "error", message: "Company not found" });
      } else {
        res.json({
          status: "success",
          data: company,
        });
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
