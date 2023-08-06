const InvariantError = require('../../exceptions/client/InvariantError');
const PostEmployeePayloadSchema = require('./schema');

const EmployeesValidator = {
  validatePostEmployeePayload: (payload) => {
    const validationResult = PostEmployeePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = EmployeesValidator;
