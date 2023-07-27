class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postUsersHandler(request, h) {}

  async getUsersHandler(request, h) {}

  async getUserByIdHandler(request, h) {}

  async putUserByIdHandler(request, h) {}

  async deleteUserByIdHandler(request, h) {}
}

module.exports = UsersHandler;
