const Joi = require('joi');

const PostTransactionsPayloadSchema = Joi.object({
  menuId: Joi.string().required(),
  date: Joi.date().required(),
  qty: Joi.number().strict().min(1).required(),
  status: Joi.string().required(),
});

module.exports = { PostTransactionsPayloadSchema };
