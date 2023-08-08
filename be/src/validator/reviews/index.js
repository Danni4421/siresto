const {
  PostReviewsPayloadSchema,
  PutReviewsPayloadSchema,
} = require('./schema');
const InvariantError = require('../../exceptions/client/InvariantError');

const ReviewsValidator = {
  validatePostReviewPayload: (payload) => {
    const validationResult = PostReviewsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutReviewPayload: (payload) => {
    const validationResult = PutReviewsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ReviewsValidator;
