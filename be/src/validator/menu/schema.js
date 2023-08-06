const Joi = require('joi');

const PostMenuPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(1).required(),
  categoryId: Joi.string().required(),
});

const PutMenuPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(1).required(),
  categoryId: Joi.string().required(),
});

const PostCoverImageHeaderSchema = Joi.object({
  'content-type': Joi.string()
    .valid(
      'image/apng',
      'image/avif',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/webp'
    )
    .required(),
}).unknown();

module.exports = {
  PostMenuPayloadSchema,
  PutMenuPayloadSchema,
  PostCoverImageHeaderSchema,
};
