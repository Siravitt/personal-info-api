const Joi = require("joi");
const validate = require("./validate");

const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

exports.validateLogin = validate(loginSchema);
