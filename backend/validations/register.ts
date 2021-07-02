import { body } from "express-validator";

export const registerValidators = [
  body("email").isEmail().withMessage("Wrong type of email"),
  body("name")
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage("Max length of name is from 2 to 40 characters"),
  body("password").custom((value, { req }) => {
    if (value !== req.body.password2) {
      throw new Error("Passwords do not match");
    } else {
      return value;
    }
  }),
];
