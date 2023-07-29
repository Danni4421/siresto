const InvariantError = require('../../exceptions/client/InvariantError');
const CategoriesPayloadSchema = require('./schema');

const CategoriesValidator = {
  validatePostCategoriesPayload: (payload) => {
    const validationResult = CategoriesPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CategoriesValidator;
