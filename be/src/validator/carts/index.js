const { PostCartsPayloadSchema, PutCartsPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/client/InvariantError');

const CartsValidator = {
  validatePostCartsPayload: (payload) => {
    const validationResult = PostCartsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutCartsPayload: (payload) => {
    const validationResult = PutCartsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CartsValidator;
