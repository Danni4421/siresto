const autoBind = require('auto-bind');

class ChefsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postChefsHandler(request, h) {
    this._validator.validatePostChefsPayload(request.payload);
    const chefId = await this._service.addChefs(request.payload);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan chef.',
      data: {
        chefId,
      },
    });
    response.code(201);
    return response;
  }

  async getChefsHandler(request, h) {
    const chefs = await this._service.getChefs();
    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan chefs.',
      data: {
        chefs,
      },
    });
    return response;
  }

  async getChefByIdHandler(request, h) {
    const { id: chefId } = request.params;
    const chef = await this._service.getChefById(chefId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan chef.',
      data: {
        chef,
      },
    });
    return response;
  }

  async deleteChefByIdHandler(request, h) {
    const { id: chefId } = request.params;
    await this._service.deleteChefById(chefId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus chef.',
    });
    return response;
  }
}

module.exports = ChefsHandler;
