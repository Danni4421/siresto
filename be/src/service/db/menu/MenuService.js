const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const config = require('../../../config');
const NotFoundError = require('../../../exceptions/client/NotFoundError');
const InvariantError = require('../../../exceptions/client/InvariantError');

class MenuService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addMenu({ name, price, categoryId, coverUrl }) {
    const id = `menu-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO menu VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, price, categoryId, coverUrl],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal menambahkan menu.');
    }

    await this._cacheService.remove('menu');

    return result.rows[0].id;
  }

  async addMenuCover(filename, menuId) {
    const url = `http://${config.server.host}:${config.server.port}/menu/${menuId}/covers/${filename}`;

    const query = {
      text: 'UPDATE menu SET cover_url = $1 WHERE id = $2',
      values: [url, menuId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui cover, Id tidak ditemukan.');
    }

    await this._cacheService.remove(`menu:${menuId}`);
  }

  async getMenu() {
    const key = `menu`;

    try {
      const result = await this._cacheService.get(key);
      const menu = JSON.parse(result);
      return menu;
    } catch (error) {
      if (error instanceof NotFoundError) {
        const result = await this._pool.query(`
            SELECT 
                m.id,
                m.name,
                m.price,
                m.cover_url AS cover,
                c.name AS category
            FROM menu m
                LEFT JOIN categories c ON c.id = m.category_id
        `);

        if (!result.rowCount) {
          throw new NotFoundError('Gagal mendapatkan menu.');
        }

        const menu = result.rows;
        const value = JSON.stringify(menu);
        await this._cacheService.set(key, value);

        return menu;
      }
    }
  }

  async getMenuById(menuId) {
    const key = `menu:${menuId}`;
    try {
      const result = await this._cacheService.get(key);
      const menu = JSON.parse(result);
      return menu;
    } catch (error) {
      const query = {
        text: `
            SELECT 
                m.id,
                m.name,
                m.price,
                m.cover_url AS cover,
                c.name AS category
            FROM menu m
                LEFT JOIN categories c ON c.id = m.category_id
                WHERE m.id = $1
        `,
        values: [menuId],
      };

      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Gagal mendapatkan menu, Id tidak ditemukan.');
      }

      const menu = result.rows[0];
      const value = JSON.stringify(menu);
      await this._cacheService.set(key, value);

      return menu;
    }
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
      throw new NotFoundError('Gagal memperbarui menu, Id tidak ditemukan');
    }

    await this._cacheService.remove(`menu:${menuId}`);
  }

  async deleteMenuById(menuId) {
    const query = {
      text: 'DELETE FROM menu WHERE id = $1 RETURNING id',
      values: [menuId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus menu, Id tidak ditemukan.');
    }

    await this._cacheService.remove(`menu:${menuId}`);
  }
}

module.exports = MenuService;
