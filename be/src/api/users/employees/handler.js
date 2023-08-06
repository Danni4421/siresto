const autoBind = require('auto-bind');

class EmployeesHandler {
  constructor(service, adminsService, superAdminsService, validator) {
    this._service = service;
    this._adminsService = adminsService;
    this._superAdminsService = superAdminsService;
    this._validator = validator;

    autoBind(this);
  }

  async postEmployeesHandler(request, h) {
    this._validator.validatePostEmployeePayload(request.payload);
    const { id } = request.auth.credentials;
    await this._superAdminsService.validateSuperAdmin({ id });

    const employeeId = await this._service.addEmployees(request.payload);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan pegawai.',
      data: {
        employeeId,
      },
    });
    response.code(201);
    return response;
  }

  async getEmployeesHandler(request, h) {
    const employees = await this._service.getEmployees();
    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan data pegawai.',
      data: {
        employees,
      },
    });
    return response;
  }

  async getEmployeeByIdHandler(request, h) {
    const { id: employeeId } = request.params;
    const employee = await this._service.getEmployeeById(employeeId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan data pegawai.',
      data: {
        employee,
      },
    });
    return response;
  }

  async deleteEmployeeByIdHandler(request, h) {
    const { id: employeeId } = request.params;
    await this._service.deleteEmployeeById(employeeId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus pegawai.',
    });
    return response;
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

module.exports = EmployeesHandler;
