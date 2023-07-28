const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const MapCartsToModels = require('../../utils/map/carts');

class CartsService {
  constructor() {
    this._pool = new Pool();
  }

  async addCarts({ transactionId, status }) {
    const id = `cart-${nanoid(16)}`;
    const orderDate = new Date().toISOString();
    const query = {
      text: 'INSERT INTO carts VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, transactionId, orderDate, status],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menambahkan ke keranjang.');
    }

    return result.rows[0].id;
  }

  async getCarts(userId) {
    const query = {
      text: `
            SELECT 
                t.id,
                m.name,
                t.qty,
                c.order_date,
                c.status
                FROM carts c
                    LEFT JOIN transactions t ON t.id = c.transaction_id
                    LEFT JOIN menu m ON m.id = t.menu_id
                    WHERE t.user_id = $1
        `,
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan order.');
    }

    return result.rows.map(MapCartsToModels);
  }

  async putCartById(cartId, { status }) {
    const query = {
      text: 'UPDATE carts SET status = $1 WHERE id = $2',
      values: [status, cartId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal memperbarui order. Id tidak ditemukan.');
    }
  }

  async deleteCartById(cartId) {
    const query = {
      text: 'DELETE FROM carts WHERE id = $1 RETURNING id',
      values: [cartId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus order, Id tidak ditemukan.');
    }
  }
}

module.exports = CartsService;
