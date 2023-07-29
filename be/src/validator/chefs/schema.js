const Joi = require('joi');

const ChefsPayloadSchema = Joi.object({
  certifications: Joi.array().items(Joi.string()).required(),
});

module.exports = ChefsPayloadSchema;
