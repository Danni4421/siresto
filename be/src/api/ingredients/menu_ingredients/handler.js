const autoBind = require('auto-bind');

class MenuIngredientsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postMenuIngredientHandler(request, h) {
    this._validator.validatePostMenuIngredientPayload(request.payload);
    const menuIngredientId = await this._service.addMenuIngredients(
      request.payload
    );
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan bahan baku menu.',
      data: {
        menuIngredientId,
      },
    });
    response.code(201);
    return response;
  }

  async getMenuIngredientHandler(request) {
    const { id: menuId } = request.params;
    const menu_ingredients = await this._service.getMenuIngredients(menuId);
    return {
      status: 'success',
      message: 'Berhasil mendapatkan bahan baku menu.',
      data: {
        menu_ingredients,
      },
    };
  }

  async deleteMenuIngredientByIdHandler(request) {
    const { menuId, ingredientId } = request.params;
    await this._service.deleteMenuIngredient(menuId, ingredientId);
    return {
      status: 'success',
      message: 'Berhasil menghapus bahan baku menu.',
    };
  }
}

module.exports = MenuIngredientsHandler;
