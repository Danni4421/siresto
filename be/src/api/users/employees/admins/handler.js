const autoBind = require('auto-bind');

class AdminsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postAdminsHandler(request, h) {
    this._validator.validatePostAdminPayload(request.payload);
    const { employeeId } = request.payload;

    const adminId = await this._service.addAdmins(employeeId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan admin.',
      data: {
        adminId,
      },
    });
    response.code(201);
    return response;
  }

  async deleteAdminByIdHandler(request, h) {
    const { id: adminId } = request.params;
    await this._service.deleteAdminById(adminId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus admin.',
    });
    return response;
  }
}

module.exports = AdminsHandler;
