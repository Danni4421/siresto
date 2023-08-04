const autoBind = require('auto-bind');

class MenuHandler {
  constructor(menuService, chefsService, validator) {
    this._menuService = menuService;
    this._chefsService = chefsService;
    this._validator = validator;

    autoBind(this);
  }

  async postMenuHandler(request, h) {
    this._validator.validatePostMenuPayload(request.payload);
    const { id: userId } = request.auth.credentials;

    await this._chefsService.verifyChef(userId);
    const menuId = await this._menuService.addMenu(request.payload);
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
    const menu = await this._menuService.getMenu();
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
    const menu = await this._menuService.getMenuById(menuId);
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
    const { id: userId } = request.auth.credentials;
    const { id: menuId } = request.params;

    await this._chefsService.verifyChef(userId);
    await this._menuService.putMenuById(menuId, request.payload);

    return {
      status: 'success',
      message: 'Berhasil memperbarui menu.',
    };
  }

  async deleteMenuByIdHandler(request) {
    const { id: userId } = request.auth.credentials;
    const { id: menuId } = request.params;

    await this._chefsService.verifyChef(userId);
    await this._menuService.deleteMenuById(menuId);
    return {
      status: 'success',
      message: 'Berhasil menghapus menu.',
    };
  }
}

module.exports = MenuHandler;
