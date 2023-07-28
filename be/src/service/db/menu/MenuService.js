const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class MenuService {
  constructor() {
    this._pool = new Pool();
  }

  async addMenu({ name, price, categoryId }) {
    const id = `menu-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO menu VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, name, price, categoryId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menambahkan menu.');
    }

    return result.rows[0].id;
  }

  async getMenu() {
    const result = await this._pool.query(`
            SELECT 
                m.id,
                m.name,
                m.price,
                c.name
            FROM menu m
                LEFT JOIN categories c ON c.id = m.category_id
        `);

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan menu.');
    }

    return result.rows;
  }

  async getMenuById(menuId) {
    const query = {
      text: `
            SELECT 
                m.id,
                m.name,
                m.price,
                c.name
            FROM menu m
                LEFT JOIN categories c ON c.id = m.category_id
                WHERE m.id = $1
        `,
      values: [menuId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan menu, Id tidak ditemukan.');
    }

    return result.rows;
  }

  async putMenuById(menuId, { name, price, categoryId }) {
    const query = {
      text: `
            UPDATE menu SET
            name = $1,
            price = $2,
            category_id = $3
            WHERE id = $4
        `,
      values: [name, price, categoryId, menuId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal memperbarui menu, Id tidak ditemukan');
    }
  }

  async deleteMenuById(menuId) {
    const query = {
      text: 'DELETE FROM menu WHERE id = $1 RETURNING id',
      values: [menuId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus menu, Id tidak ditemukan.');
    }
  }
}

module.exports = MenuService;
