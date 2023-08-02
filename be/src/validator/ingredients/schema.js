const Joi = require('joi');

const PostIngredientPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().strict().required(),
  stock: Joi.number().strict().required(),
  unit: Joi.string().required(),
});

const PutIngredientPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().strict().required(),
  stock: Joi.number().strict().required(),
  unit: Joi.string().required(),
});

module.exports = { PostIngredientPayloadSchema, PutIngredientPayloadSchema };
