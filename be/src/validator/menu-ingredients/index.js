const InvariantError = require('../../exceptions/client/InvariantError');
const PostMenuIngredientsPayloadSchema = require('./schema');

const MenuIngredientsValidator = {
  validatePostMenuIngredientPayload: (payload) => {
    const validationResult = PostMenuIngredientsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = MenuIngredientsValidator;
