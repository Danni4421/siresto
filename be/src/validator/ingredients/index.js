const InvariantError = require('../../exceptions/client/InvariantError');
const IngredientPayloadSchema = require('./schema');

const IngredientsValidator = {
  validatePostIngredientPayload: (payload) => {
    const validationResult = IngredientPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = IngredientsValidator;
