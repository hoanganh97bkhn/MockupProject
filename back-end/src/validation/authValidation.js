import {check} from "express-validator/check";
import {transValidation} from "./../../lang/vi";

let register = [
  check("nickname", transValidation.nickname_incorrect)
    .isLength({min: 1}),
  check("email", transValidation.email_incorrect)
    .isEmail()
    .trim(),
  check("gender", transValidation.gender_incorrect)
    .isIn(["male", "female"]),
  check("password", transValidation.password_incorrect)
    .isLength({min: 8}),
    // .matches("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")
  check("password_confirmation", transValidation.password_confirmation_incorrect)
    .custom((value, {req}) => {
      return value === req.body.password
    })
];

module.exports = {
  register
}
