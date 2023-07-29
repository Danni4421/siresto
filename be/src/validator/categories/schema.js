const Joi = require('joi');

const CategoriesPayloadSchema = Joi.object({
  name: Joi.string().min(1).required(),
});

module.exports = CategoriesPayloadSchema;
