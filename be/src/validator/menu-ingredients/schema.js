const Joi = require('joi');

const PostMenuIngredientsPayloadSchema = Joi.object({
  menuId: Joi.string().required(),
  ingredientId: Joi.string().required(),
  qty: Joi.number().strict().required(),
});

module.exports = PostMenuIngredientsPayloadSchema;
