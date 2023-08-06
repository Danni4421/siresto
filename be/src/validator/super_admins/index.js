const InvariantError = require('../../exceptions/client/InvariantError');
const {
  PostAuthenticationsSuperAdminPayloadSchema,
  PutAuthenticationsSuperAdminPayloadSchema,
  DeleteAuthenticationsSuperAdminPayloadSchema,
} = require('./schema');

const SuperAdminsValidator = {
  validatePostAuthenticationsPayload: (payload) => {
    const validationResult =
      PostAuthenticationsSuperAdminPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutAuthenticationsPayload: (payload) => {
    const validationResult =
      PutAuthenticationsSuperAdminPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateDeleteAuthenticationsPayload: (payload) => {
    const validationResult =
      DeleteAuthenticationsSuperAdminPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SuperAdminsValidator;
