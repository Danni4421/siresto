const autoBind = require('auto-bind');

class MenuHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postMenuHandler(request, h) {
    this._validator.validatePostMenuPayload(request.payload);
    const menuId = await this._service.addMenu(request.payload);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan menu.',
      data: {
        menuId,
      },
    });
    response.code(201);
    return response;
  }

  async getMenuHandler() {
    const menu = await this._service.getMenu();
    return {
      status: 'success',
      message: 'Berhasil mendapatkan menu.',
      data: {
        menu,
      },
    };
  }

  async getMenuByIdHandler(request) {
    const { id: menuId } = request.params;
    const menu = await this._service.getMenuById(menuId);
    return {
      status: 'success',
      message: 'Berhasil mendapatkan menu.',
      data: {
        menu,
      },
    };
  }

  async putMenuByIdHandler(request) {
    this._validator.validatePutMenuPayload(request.payload);
    const { id: menuId } = request.params;
    await this._service.putMenuById(menuId, request.payload);

    return {
      status: 'success',
      message: 'Berhasil memperbarui menu.',
    };
  }

  async deleteMenuByIdHandler(request) {
    const { id: menuId } = request.params;
    await this._service.deleteMenuById(menuId);
    return {
      status: 'success',
      message: 'Berhasil menghapus menu.',
    };
  }
}

module.exports = MenuHandler;
