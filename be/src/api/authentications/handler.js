const autoBind = require('auto-bind');

class AuthenticationsHandler {
  constructor(usersService, authenticationsService, tokenManager, validator) {
    this._usersService = usersService;
    this._authenticationsService = authenticationsService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    autoBind(this);
  }

  async postAuthenticationsHandler(request, h) {
    this._validator.validatePostAuthenticationPayload(request.payload);
    const id = await this._usersService.verifyUser(request.payload);

    const accessToken = await this._tokenManager.generateAccessToken({ id });
    const { firstName, lastName, email } = await this._usersService.getUserById(
      id
    );

    await this._authenticationsService.addAccessToken(accessToken);
    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan Access Token.',
      data: {
        accessToken,
        authState: {
          id,
          firstName,
          lastName,
          email,
        },
      },
    });
    response.code(201);
    return response;
  }

  async deleteAuthenticationsHandler(request) {
    this._validator.validateDeleteAuthenticationPayload(request.payload);
    const { accessToken } = request.payload;

    await this._authenticationsService.deleteAccessToken(accessToken);
    return {
      status: 'success',
      message: 'Berhasil menghapus refresh token.',
    };
  }
}

module.exports = AuthenticationsHandler;
