const Joi = require('joi');

const PostUsersPayloadSchema = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().min(8).max(20).required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
});

const PutUsersPayloadSchema = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
});

const PutPasswordUserSchema = Joi.object({
  password: Joi.string().min(8).max(20).required(),
});

module.exports = {
  PostUsersPayloadSchema,
  PutUsersPayloadSchema,
  PutPasswordUserSchema,
};
