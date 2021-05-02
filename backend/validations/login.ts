import { body } from "express-validator";

export const loginValidators = [
  body("email").isEmail().withMessage("Wrong type of email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Minimum password lenght is 6 characters")
];