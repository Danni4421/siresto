const InvariantError = require('../../exceptions/client/InvariantError');
const TransactionsPayloadSchema = require('./schema');

const TransactionsValidator = {
  validatePostTransactionPayload: (payload) => {
    const validationResult = TransactionsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = TransactionsValidator;
