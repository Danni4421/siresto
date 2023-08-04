const autoBind = require('auto-bind');

class CategoriesHandler {
  constructor(categoriesService, chefsService, validator) {
    this._categoriesService = categoriesService;
    this._chefsService = chefsService;
    this._validator = validator;

    autoBind(this);
  }

  async postCategoriesHandler(request, h) {
    this._validator.validatePostCategoriesPayload(request.payload);
    const { id: userId } = request.auth.credentials;
    await this._chefsService.verifyChef(userId);
    const categoryId = await this._categoriesService.addCategories(
      request.payload
    );
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
    const categories = await this._categoriesService.getCategories();
    return {
      status: 'success',
      message: 'Berhasil mendapatkan kategori.',
      data: {
        categories,
      },
    };
  }

  async putCategoryByIdHandler(request) {
    this._validator.validatePutCategoriesPayload(request.payload);
    const { id: categoryId } = request.params;
    const { id: userId } = request.auth.credentials;
    await this._chefsService.verifyChef(userId);
    await this._categoriesService.putCategoryById(categoryId, request.payload);
    return {
      status: 'success',
      message: 'Berhasil memperbarui kategori.',
    };
  }

  async deleteCategoryByIdHandler(request) {
    const { id: categoryId } = request.params;
    const { id: userId } = request.auth.credentials;
    await this._chefsService.verifyChef(userId);
    await this._categoriesService.deleteCategoryById(categoryId);
    return {
      status: 'success',
      message: 'Berhasil menghapus kategori.',
    };
  }
}

module.exports = CategoriesHandler;
