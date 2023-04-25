const Joi = require("joi");
const validate = require("./validate");

const registerSchema = Joi.object({
  username: Joi.string().trim().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username is required",
    "string.base": "Username must be a string",
  }),
  firstName: Joi.string().trim().required().messages({
    "any.required": "First name is required",
    "string.empty": "First name is required",
    "string.base": "First name must be a string",
  }),
  lastName: Joi.string().trim().required().messages({
    "any.required": "Last name is required",
    "string.empty": "Last name is required",
    "string.base": "Last name must be a string",
  }),
  password: Joi.string().alphanum().min(6).trim().required().messages({
    "string.empty": "Password is required",
    "string.alphanum": "Password must contain number or alphabet",
    "string.min": "Password length must be at least 6 characters long",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .messages({
      "any.only": "Password not match",
      "string.empty": "Confirm password is require",
    }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must have 10 digits.",
      "any.required": "Phone is required",
    }),
  citizenId: Joi.string()
    .regex(/^[0-9]{13}$/)
    .required()
    .messages({
      "string.pattern.base": "Citizen ID must have 13 digits.",
      "any.required": "Citizen ID is required",
    }),
});

exports.validateRegister = validate(registerSchema);
