const InvariantError = require('../../exceptions/client/InvariantError');
const {
  PostIngredientPayloadSchema,
  PutIngredientPayloadSchema,
} = require('./schema');

const IngredientsValidator = {
  validatePostIngredientPayload: (payload) => {
    const validationResult = PostIngredientPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutIngredientPayload: (payload) => {
    const validationResult = PutIngredientPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = IngredientsValidator;
