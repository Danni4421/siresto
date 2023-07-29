const Joi = require('joi');

const MenuPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(1).required(),
  categoryId: Joi.string().required(),
});

module.exports = MenuPayloadSchema;
