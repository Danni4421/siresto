const autoBind = require('auto-bind');
const InvariantError = require('../../../exceptions/client/InvariantError');
const NotFoundError = require('../../../exceptions/client/NotFoundError');

class CartsHandler {
  constructor(service, ingredientsService, menuIngredientsService, validator) {
    this._service = service;
    this._ingredientsService = ingredientsService;
    this._menuIngredientsService = menuIngredientsService;
    this._validator = validator;

    autoBind(this);
  }

  async addCartsHandler(request, h) {
    this._validator.validatePostCartsPayload(request.payload);
    const { id: userId } = request.auth.credentials;
    const { menuId, qty } = request.payload;

    await this._service.verifyUserCart(userId, menuId);

    const menuIngredients =
      await this._menuIngredientsService.getMenuIngredients(menuId);

    try {
      await Promise.all(
        menuIngredients.map(async (i) => {
          const neededStock = i.qty * qty;
          await this._ingredientsService.verifyIngredientStock(
            i.id,
            neededStock
          );
        })
      );
    } catch (error) {
      if (error instanceof InvariantError) {
        return {
          status: 'fail',
          message: 'Stock Bahan baku tidak cukup.',
        };
      } else if (error instanceof NotFoundError) {
        return {
          status: 'fail',
          message: 'Tidak memiliki Bahan baku yang dibutuhkan.',
        };
      }
    }

    const cartId = await this._service.addCarts(userId, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan ke keranjang.',
      data: {
        cartId,
      },
    });
    response.code(201);
    return response;
  }

  async getCartsHandler(request) {
    const { id: userId } = request.auth.credentials;
    const carts = await this._service.getCartByUserId(userId);

    return {
      status: 'success',
      message: 'Berhasil mendapatkan keranjang belanja.',
      data: {
        carts,
      },
    };
  }

  async getCartByIdHandler(request) {
    const { id: cartId } = request.params;

    const cart = await this._service.getCartById(cartId);

    return {
      status: 'success',
      message: 'Berhasil mendapatkan keranjang belanja.',
      data: {
        cart,
      },
    };
  }

  async getCartByMenuIdHandler(request) {
    const { id: menuId } = request.params;
    const { id: userId } = request.auth.credentials;

    const cart = await this._service.getCartByMenuId(userId, menuId);

    return {
      status: 'success',
      message: 'Berhasil mendapatkan keranjang belanja.',
      data: {
        cart,
      },
    };
  }

  async putCartByIdHandler(request) {
    this._validator.validatePutCartsPayload(request.payload);
    const { id: cartId } = request.params;
    const { qty } = request.payload;

    const { menuId } = await this._service.getCartById(cartId);

    const menuIngredients =
      await this._menuIngredientsService.getMenuIngredients(menuId);

    try {
      await Promise.all(
        menuIngredients.map(async (i) => {
          const neededStock = i.qty * qty;
          await this._ingredientsService.verifyIngredientStock(
            i.id,
            neededStock
          );
        })
      );
    } catch (error) {
      throw error;
    }

    await this._service.putCartById(cartId, request.payload);

    return {
      status: 'success',
      message: 'Berhasil memperbarui keranjang belanja.',
    };
  }

  async delCartByIdHandler(request) {
    const { id: cartId } = request.params;
    await this._service.delCartById(cartId);

    return {
      status: 'success',
      message: 'Berhasil menghapus keranjang belanja.',
    };
  }
}

module.exports = CartsHandler;
