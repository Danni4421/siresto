const CategoriesPayloadSchema = require('./schema');

const CategoriesValidator = {
  validatePostCategoriesPayload: (payload) => {
    const validationResult = CategoriesPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = CategoriesValidator;
