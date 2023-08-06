const autoBind = require('auto-bind');

class SuperAdminsHandler {
  constructor(
    service,
    tokenManager,
    authenticationsService,
    validator,
    AuthenticationsValidator
  ) {
    this._service = service;
    this._tokenManager = tokenManager;
    this._authenticationsService = authenticationsService;
    this._validator = validator;
    this._authenticationsValidator = AuthenticationsValidator;

    autoBind(this);
  }
  async postAuthenticationsSuperAdminHandler(request, h) {
    this._validator.validatePostAuthenticationsPayload(request.payload);
    const id = await this._service.verifySuperAdmin(request.payload);

    const accessToken = await this._tokenManager.generateAccessToken({ id });
    const refreshToken = await this._tokenManager.generateRefreshToken({ id });

    await this._authenticationsService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Berhasil melakukan Autentikasi.',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationsSuperAdminHandler(request) {
    this._validator.validatePutAuthenticationsPayload(request.payload);

    const { refreshToken } = request.payload;
    const id = await this._tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = await this._tokenManager.generateAccessToken({ id });

    return {
      status: 'success',
      message: 'Berhasil memperbarui Access Token',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationsSuperAdminHandler(request) {
    this._validator.validateDeleteAuthenticationsPayload(request.payload);
    const { refreshToken } = request.payload;
    await this._authenticationsService.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Berhasil menghapus refresh token',
    };
  }
}

module.exports = SuperAdminsHandler;
