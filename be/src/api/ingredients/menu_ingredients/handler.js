const autoBind = require('auto-bind');

class MenuIngredientsHandler {
  constructor(menuIngredientsService, chefsService, validator) {
    this._menuIngredientsService = menuIngredientsService;
    this._chefsService = chefsService;
    this._validator = validator;

    autoBind(this);
  }

  async postMenuIngredientHandler(request, h) {
    this._validator.validatePostMenuIngredientPayload(request.payload);
    const { id: userId } = request.auth.credentials;

    await this._chefsService.verifyChef(userId);
    const menuIngredientId =
      await this._menuIngredientsService.addMenuIngredients(request.payload);

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
    const menu_ingredients =
      await this._menuIngredientsService.getMenuIngredients(menuId);
    return {
      status: 'success',
      message: 'Berhasil mendapatkan bahan baku menu.',
      data: {
        menu_ingredients,
      },
    };
  }

  async deleteMenuIngredientByIdHandler(request) {
    const { id: userId } = request.auth.credentials;
    await this._chefsService.verifyChef(userId);

    const { menuId, ingredientId } = request.params;
    await this._menuIngredientsService.deleteMenuIngredient(
      menuId,
      ingredientId
    );
    return {
      status: 'success',
      message: 'Berhasil menghapus bahan baku menu.',
    };
  }
}

module.exports = MenuIngredientsHandler;
