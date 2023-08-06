const InvariantError = require('../../exceptions/client/InvariantError');
const {
  PostCategoriesPayloadSchema,
  PutCategoriesPayloadSchema,
} = require('./schema');

const CategoriesValidator = {
  validatePostCategoriesPayload: (payload) => {
    const validationResult = PostCategoriesPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutCategoriesPayload: (payload) => {
    const validationResult = PutCategoriesPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CategoriesValidator;
