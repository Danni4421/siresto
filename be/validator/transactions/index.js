const TransactionsPayloadSchema = require('./schema');

const TransactionsValidator = {
  validatePostTransactionPayload: (payload) => {
    const validationResult = TransactionsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = TransactionsValidator;
