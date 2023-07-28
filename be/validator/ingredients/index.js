const IngredientPayloadSchema = require('./schema');

const IngredientsValidator = {
  validatePostIngredientPayload: (payload) => {
    const validationResult = IngredientPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = IngredientsValidator;
