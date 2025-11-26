import joi from "joi";

export const registerSchema = joi.object({
  phone: joi
    .string()
    .required()
    .pattern(/^(98|97|91)\d{8}$/)
    .length(10),

  fullName: joi
    .string()
    .required()
    .pattern(/^[a-zA-Z ]+$/),

  userName: joi
    .string()
    .required()
    .pattern(/^[a-zA-Z ]+$/),

  password: joi
    .string()
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
    ),
});
