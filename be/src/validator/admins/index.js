const InvariantError = require('../../exceptions/client/InvariantError');
const { PostAdminsPayloadSchema } = require('./schema');

const AdminsValidator = {
  validatePostAdminPayload: (payload) => {
    const validationResult = PostAdminsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AdminsValidator;
