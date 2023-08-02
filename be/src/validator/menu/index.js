const InvariantError = require('../../exceptions/client/InvariantError');
const { PostMenuPayloadSchema, PutMenuPayloadSchema } = require('./schema');

const MenuValidator = {
  validatePostMenuPayload: (payload) => {
    const validationResult = PostMenuPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutMenuPayload: (payload) => {
    const validationResult = PutMenuPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = MenuValidator;
