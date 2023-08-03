const autoBind = require('auto-bind');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postUsersHandler(request, h) {
    this._validator.validatePostUserPayload(request.payload);
    const userId = await this._service.addUsers(request.payload);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan User.',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }

  async getUsersHandler() {
    const users = await this._service.getUsers();
    return {
      status: 'success',
      message: 'Berhasil mendapatkan User.',
      data: {
        users,
      },
    };
  }

  async getUserByIdHandler(request, h) {
    const { id: userId } = request.params;
    const user = await this._service.getUserById(userId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan User.',
      data: {
        user,
      },
    });
    return response;
  }

  async putUserByIdHandler(request, h) {
    this._validator.validatePutUserPayload(request.payload);

    const { id: userId } = request.params;
    await this._service.putUserById(userId, request.payload);
    const response = h.response({
      status: 'success',
      message: 'Berhasil memperbarui User.',
    });
    return response;
  }

  async putPasswordUserByIdHandler(request, h) {
    this._validator.validatePutPasswordPayload(request.payload);

    const { id: userId } = request.params;
    const updatedPassword = await this._service.confirmPassword(
      userId,
      request.payload
    );
    await this._service.putPasswordUserById(userId, updatedPassword);
    const response = h.response({
      status: 'success',
      message: 'Berhasil memperbarui password.',
    });
    return response;
  }

  async deleteUserByIdHandler(request, h) {
    const { id: userId } = request.params;
    await this._service.deleteUserById(userId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus User.',
    });
    return response;
  }
}

module.exports = UsersHandler;
