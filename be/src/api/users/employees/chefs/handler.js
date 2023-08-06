const autoBind = require('auto-bind');
const NotFoundError = require('../../../../exceptions/client/NotFoundError');

class ChefsHandler {
  constructor(service, adminsService, superAdminsService, validator) {
    this._service = service;
    this._adminsService = adminsService;
    this._superAdminsService = superAdminsService;
    this._validator = validator;

    autoBind(this);
  }

  async postChefsHandler(request, h) {
    this._validator.validatePostChefsPayload(request.payload);
    const { id } = request.auth.credentials;

    await this._superAdminsService.validateSuperAdmin({ id });
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
    const { id } = request.auth.credentials;
    await this.verifyAccess({ id });

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

  async getChefByIdHandler(request) {
    const { id } = request.auth.credentials;
    await this.verifyAccess({ id });

    const { id: chefId } = request.params;
    const chef = await this._service.getChefById(chefId);
    return {
      status: 'success',
      message: 'Berhasil mendapatkan chef.',
      data: {
        chef,
      },
    };
  }

  async deleteChefByIdHandler(request, h) {
    const { id } = request.auth.credentials;
    await this._superAdminsService.validateSuperAdmin({ id });

    const { id: chefId } = request.params;
    await this._service.deleteChefById(chefId);
    return {
      status: 'success',
      message: 'Berhasil menghapus chef.',
    };
  }

  async verifyAccess({ id }) {
    try {
      await this._adminsService.verifyAdmin({ id });
    } catch (error) {
      if (error instanceof NotFoundError) {
        try {
          await this._superAdminsService.validateSuperAdmin({ id });
        } catch {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }
}

module.exports = ChefsHandler;
