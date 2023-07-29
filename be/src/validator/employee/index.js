const InvariantError = require('../../exceptions/client/InvariantError');
const EmployeePayloadSchema = require('./schema');

const EmployeeValidator = {
  validatePostEmployeePayload: (payload) => {
    const validationResult = EmployeePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = EmployeeValidator;
