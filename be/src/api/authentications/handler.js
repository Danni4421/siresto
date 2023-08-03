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
    const refreshToken = await this._tokenManager.generateRefreshToken({ id });

    await this._authenticationsService.addRefreshToken(refreshToken);
    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan Access Token.',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationsHandler(request) {
    this._validator.validatePutAuthenticationPayload(request.payload);
    const { refreshToken } = request.payload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);
    const id = await this._tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = await this._tokenManager.generateAccessToken({ id });

    return {
      status: 'success',
      message: 'Berhasil memperbarui access token.',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationsHandler(request) {
    this._validator.validateDeleteAuthenticationPayload(request.payload);
    const { refreshToken } = request.payload;

    await this._authenticationsService.deleteRefreshToken(refreshToken);
    return {
      status: 'success',
      message: 'Berhasil menghapus refresh token.',
    };
  }
}

module.exports = AuthenticationsHandler;
