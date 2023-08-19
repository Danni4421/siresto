const Joi = require('joi');

const PostCartsPayloadSchema = Joi.object({
  menuId: Joi.string().required(),
  qty: Joi.number().strict().required(),
});

const PutCartsPayloadSchema = Joi.object({
  qty: Joi.number().strict().required(),
});

module.exports = { PostCartsPayloadSchema, PutCartsPayloadSchema };
