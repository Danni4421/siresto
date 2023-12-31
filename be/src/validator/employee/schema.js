const Joi = require('joi');

const PostEmployeePayloadSchema = Joi.object({
  userId: Joi.string().required(),
  birthdate: Joi.date().required(),
  ktpId: Joi.string().length(16).required(),
});

module.exports = PostEmployeePayloadSchema;
