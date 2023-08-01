const autoBind = require('auto-bind');

class IngredientsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postIngredientsHandler(request, h) {
    this._validator.validatePostIngredientPayload(request.payload);
    const ingredientId = await this._service.addIngredients(request.payload);
    console.log(ingredientId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan bahan baku.',
      data: {
        ingredientId,
      },
    });
    response.code(201);
    return response;
  }

  async getIngredientsHandler() {
    const ingredients = await this._service.getIngredients();
    return {
      status: 'success',
      message: 'Berhasil mendapatkan bahan baku.',
      data: {
        ingredients,
      },
    };
  }

  async getIngredientByIdHandler(request) {
    const { id: ingredientId } = request.params;
    const ingredient = await this._service.getIngredientById(ingredientId);
    return {
      status: 'success',
      message: 'Berhasil mendapatkan bahan baku.',
      data: {
        ingredient,
      },
    };
  }

  async putIngredientByIdHandler(request) {
    this._validator.validatePutIngredientPayload(request.payload);
    const { id: ingredientId } = request.params;
    await this._service.putIngredientById(ingredientId, request.payload);
    return {
      status: 'success',
      message: 'Berhasil memperbarui bahan baku.',
    };
  }

  async deleteIngredientByIdHandler(request) {
    const { id: ingredientId } = request.params;
    await this._service.deleteIngredientById(ingredientId);
    return {
      status: 'success',
      message: 'Berhasil menghapus bahan baku.',
    };
  }
}

module.exports = IngredientsHandler;
