const EmployeePayloadSchema = require('./schema');

const EmployeeValidator = {
  validatePostEmployeePayload: (payload) => {
    const validationResult = EmployeePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = EmployeeValidator;
