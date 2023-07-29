const Joi = require('joi');

const UsersPayloadSchema = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().min(8).max(20).required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
});

module.exports = UsersPayloadSchema;
