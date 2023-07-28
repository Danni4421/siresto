const ChefsPayloadSchema = require('./schema');

const ChefsValidator = {
  validatePostChefsPayload: (payload) => {
    const validationResult = ChefsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = ChefsValidator;
