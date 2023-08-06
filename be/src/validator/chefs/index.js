const InvariantError = require('../../exceptions/client/InvariantError');
const ChefsPayloadSchema = require('./schema');

const ChefsValidator = {
  validatePostChefsPayload: (payload) => {
    const validationResult = ChefsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ChefsValidator;
