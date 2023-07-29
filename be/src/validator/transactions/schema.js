const Joi = require('joi');

const TransactionsPayloadSchema = Joi.object({
  menuId: Joi.string().required(),
  qty: Joi.number().min(1).required(),
});

module.exports = TransactionsPayloadSchema;
