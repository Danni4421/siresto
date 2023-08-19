const Joi = require('joi');

const PostAuthenticationsPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const DeleteAuthenticationsPayloadSchema = Joi.object({
  accessToken: Joi.string().required(),
});

module.exports = {
  PostAuthenticationsPayloadSchema,
  DeleteAuthenticationsPayloadSchema,
};
