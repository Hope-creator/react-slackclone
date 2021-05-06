import { body } from "express-validator";

export const loginValidators = [
  body("email").isEmail().withMessage("Wrong type of email"),
];