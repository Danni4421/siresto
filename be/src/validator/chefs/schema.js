const Joi = require('joi');

const ChefsPayloadSchema = Joi.object({
  employeeId: Joi.string().required(),
  certifications: Joi.array().items(Joi.string()).required(),
});

module.exports = ChefsPayloadSchema;
