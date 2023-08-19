const autoBind = require('auto-bind');
const path = require('path');

class MenuHandler {
  constructor(menuService, chefsService, storageService, validator) {
    this._menuService = menuService;
    this._chefsService = chefsService;
    this._storageService = storageService;
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

  async postMenuCoverHandler(request, h) {
    const { img } = request.payload;
    const { id: menuId } = request.params;
    const { id: chefId } = request.auth.credentials;
    this._validator.validateMenuCoverHeaderPayload(img.hapi.headers);

    const filename = await this._storageService.writeFile(img, img.hapi);

    await this._chefsService.verifyChef(chefId);
    await this._menuService.addMenuCover(filename, menuId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan cover.',
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

  async getMenuStockHandler(request) {
    const { id: menuId } = request.params;
    const stock = await this._menuService.getMenuStock(menuId);

    return {
      status: 'success',
      message: 'Berhasil mendapatkan stock',
      data: {
        stock,
      },
    };
  }

  async searchMenuHandler(request) {
    const { name } = request.query;
    const menu = await this._menuService.searchMenu(name);

    return {
      status: 'success',
      message: 'Berhasil mendapatkan menu',
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
    const imgPath = path.resolve(__dirname, 'covers/img');

    await this._chefsService.verifyChef(userId);
    await this._menuService.deleteMenuById(menuId, imgPath);
    return {
      status: 'success',
      message: 'Berhasil menghapus menu.',
    };
  }
}

module.exports = MenuHandler;
