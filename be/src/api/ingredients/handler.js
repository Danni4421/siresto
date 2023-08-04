const autoBind = require('auto-bind');

class IngredientsHandler {
  constructor(ingredientsService, chefsService, validator) {
    this._ingredientsService = ingredientsService;
    this._chefsService = chefsService;
    this._validator = validator;

    autoBind(this);
  }

  async postIngredientsHandler(request, h) {
    this._validator.validatePostIngredientPayload(request.payload);
    const { id: userId } = request.auth.credentials;
    await this._chefsService.verifyChef(userId);

    const ingredientId = await this._ingredientsService.addIngredients(
      request.payload
    );
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
    const ingredients = await this._ingredientsService.getIngredients();
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
    const ingredient = await this._ingredientsService.getIngredientById(
      ingredientId
    );
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
    const { id: userId } = request.auth.credentials;
    await this._chefsService.verifyChef(userId);

    const { id: ingredientId } = request.params;
    await this._ingredientsService.putIngredientById(
      ingredientId,
      request.payload
    );
    return {
      status: 'success',
      message: 'Berhasil memperbarui bahan baku.',
    };
  }

  async deleteIngredientByIdHandler(request) {
    const { id: userId } = request.auth.credentials;
    await this._chefsService.verifyChef(userId);

    const { id: ingredientId } = request.params;
    await this._ingredientsService.deleteIngredientById(ingredientId);
    return {
      status: 'success',
      message: 'Berhasil menghapus bahan baku.',
    };
  }
}

module.exports = IngredientsHandler;
