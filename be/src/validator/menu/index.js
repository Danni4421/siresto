const InvariantError = require('../../exceptions/client/InvariantError');
const MenuPayloadSchema = require('./schema');

const MenuValidator = {
  validatePostMenuPayload: (payload) => {
    const validationResult = MenuPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = MenuValidator;
