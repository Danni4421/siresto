const InvariantError = require('../../exceptions/client/InvariantError');
const {
  PostUsersPayloadSchema,
  PutPasswordUserSchema,
  PutUsersPayloadSchema,
} = require('./schema');

const UsersValidator = {
  validatePostUserPayload: (payload) => {
    const validationResult = PostUsersPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutUserPayload: (payload) => {
    const validationResult = PutUsersPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutPasswordPayload: (payload) => {
    const validationResult = PutPasswordUserSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;
