const Joi = require('joi');

const PostReviewsPayloadSchema = Joi.object({
  menuId: Joi.string().required(),
  review: Joi.string().required(),
  star: Joi.number().min(0).max(5).precision(1).required(),
});

const PutReviewsPayloadSchema = Joi.object({
  review: Joi.string().required(),
  star: Joi.number().min(1).max(5).precision(1).required(),
});

module.exports = { PostReviewsPayloadSchema, PutReviewsPayloadSchema };
