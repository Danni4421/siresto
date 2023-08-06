const Joi = require('joi');

const PostAuthenticationsSuperAdminPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const PutAuthenticationsSuperAdminPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const DeleteAuthenticationsSuperAdminPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  PostAuthenticationsSuperAdminPayloadSchema,
  PutAuthenticationsSuperAdminPayloadSchema,
  DeleteAuthenticationsSuperAdminPayloadSchema,
};
