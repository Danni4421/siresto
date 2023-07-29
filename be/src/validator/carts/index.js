const InvariantError = require('../../exceptions/client/InvariantError');
const { PostCartsPayloadSchema, PutCartsPayloadSchema } = require('./schema');

const CartsValidator = {
  validatePostCartPayload: (payload) => {
    const validationResult = PostCartsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutCartPayload: (payload) => {
    const validationResult = PutCartsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CartsValidator;
