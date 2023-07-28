const Joi = require('joi');

const PostCartsPayloadSchema = Joi.object({
  transactionId: Joi.string().required(),
  orderDate: Joi.date().required(),
  status: Joi.string().required(),
});

const PutCartsPayloadSchema = Joi.object({
  status: Joi.string().required(),
});

module.exports = { PostCartsPayloadSchema, PutCartsPayloadSchema };
