const Joi = require('joi');

const PostCategoriesPayloadSchema = Joi.object({
  name: Joi.string().min(1).required(),
});

const PutCategoriesPayloadSchema = Joi.object({
  name: Joi.string()
    .valid(
      'Appetizers',
      'Main dishes',
      'Side dishes',
      'Salad',
      'Sup',
      'Sandwiches',
      'Desserts',
      'Drink',
      'Special'
    )
    .required(),
});

module.exports = { PostCategoriesPayloadSchema, PutCategoriesPayloadSchema };
