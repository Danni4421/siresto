const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../../exceptions/client/InvariantError');
const NotFoundError = require('../../../exceptions/client/NotFoundError');
const MapCartsToModels = require('../../utils/map/carts');

class CartsService {
  constructor() {
    this._pool = new Pool();
  }

  async addCarts(userId, { menuId, qty }) {
    const id = `cart-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO carts VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, userId, menuId, qty],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal menambahkan ke keranjang belanja.');
    }

    return result.rows[0].id;
  }

  async getCartByUserId(userId) {
    const query = {
      text: 'SELECT * FROM carts WHERE user_id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan keranjang belanja.');
    }

    return result.rows.map(MapCartsToModels);
  }

  async getCartById(cartId) {
    const query = {
      text: 'SELECT * FROM carts WHERE id = $1',
      values: [cartId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan keranjang belanja.');
    }

    return result.rows.map(MapCartsToModels)[0];
  }

  async getCartByMenuId(userId, menuId) {
    const query = {
      text: 'SELECT * FROM carts WHERE user_id = $1 AND menu_id = $2',
      values: [userId, menuId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan keranjang belanja.');
    }

    console.log(result.rows);

    return result.rows[0];
  }

  async putCartById(cartId, { qty }) {
    const query = {
      text: 'UPDATE carts SET qty = $1 WHERE id = $2',
      values: [qty, cartId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        'Gagal memperbarui keranjang belanja, Id tidak ditemukan'
      );
    }
  }

  async delCartById(cartId) {
    const query = {
      text: 'DELETE FROM carts WHERE id = $1 RETURNING id',
      values: [cartId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        'Gagal menghapus keranjang belanja, Id tidak ditemukan.'
      );
    }
  }

  async verifyUserCart(userId, menuId) {
    const query = {
      text: 'SELECT * FROM carts WHERE user_id = $1 AND menu_id = $2',
      values: [userId, menuId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('Menu sudah terdapat pada keranjang belanja.');
    }
  }
}

module.exports = CartsService;
