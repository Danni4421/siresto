const Joi = require('joi');

const PostAdminsPayloadSchema = Joi.object({
  employeeId: Joi.string().required(),
});

module.exports = { PostAdminsPayloadSchema };
