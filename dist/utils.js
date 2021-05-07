var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const joi_1 = __importDefault(require('@hapi/joi'));
const validatorSchema = {
  exchangeType: joi_1.default
    .string()
    .regex(/^(BUY|SELL)$/i)
    .required(),
  margin: joi_1.default.number().required(),
  exchangeRate: joi_1.default.number().required(),
};
function doValidation(object) {
  return joi_1.default.validate(object, validatorSchema, {
    abortEarly: false,
    stripUnknown: true,
  });
}
exports.doValidation = doValidation;