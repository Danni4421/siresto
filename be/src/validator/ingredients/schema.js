const Joi = require('joi');

const IngredientPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  unit: Joi.string().required(),
});

module.exports = IngredientPayloadSchema;
