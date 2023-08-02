const Joi = require('joi');

const PostMenuPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(1).required(),
  categoryId: Joi.string().required(),
});

const PutMenuPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(1).required(),
  categoryId: Joi.string().required(),
});

module.exports = { PostMenuPayloadSchema, PutMenuPayloadSchema };
