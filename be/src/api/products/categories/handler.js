const autoBind = require('auto-bind');

class CategoriesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postCategoriesHandler(request, h) {
    this._validator.validatePostCategoriesPayload(request.payload);
    const categoryId = await this._service.addCategories(request.payload);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan kategori.',
      data: {
        categoryId,
      },
    });
    response.code(201);
    return response;
  }

  async getCategoriesHandler() {
    const categories = await this._service.getCategories();
    return {
      status: 'success',
      message: 'Berhasil mendapatkan kategori.',
      data: {
        categories,
      },
    };
  }

  async putCategoryByIdHandler(request, h) {
    this._validator.validatePutCategoriesPayload(request.payload);
    return {
      status: 'success',
      message: 'Berhasil memperbarui kategori.',
    };
  }

  async deleteCategoryByIdHandler(request, h) {
    const { id: categoryId } = request.params;
    await this._service.deleteCategoryById(categoryId);
    return {
      status: 'success',
      message: 'Berhasil menghapus kategori.',
    };
  }
}

module.exports = CategoriesHandler;
