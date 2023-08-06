const InvariantError = require('../../exceptions/client/InvariantError');
const { PostTransactionsPayloadSchema } = require('./schema');

const TransactionsValidator = {
  validatePostTransactionsPayload: (payload) => {
    const validationResult = PostTransactionsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = TransactionsValidator;
