const joi = require('@hapi/joi');
const validatorSchema = {
  type: joi
    .string()
    .regex(/^(BUY|SELL)$/i)
    .required(),
  margin: joi.number().required(),
  exchangeRate: joi.number().required(),
};
const doValidation = (object) => {
  return joi.validate(object, validatorSchema, {
    abortEarly: false,
    stripUnknown: true,
  });
}
module.exports = doValidation;