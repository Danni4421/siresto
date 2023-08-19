const fs = require('fs');
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const config = require('../../../config');
const NotFoundError = require('../../../exceptions/client/NotFoundError');
const InvariantError = require('../../../exceptions/client/InvariantError');
const InternalServerError = require('../../../exceptions/server/InternalServerError');

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

    await this._cacheService.remove('menu');
    await this._cacheService.remove(`menu:${menuId}`);
  }

  async getMenu() {
    const key = 'menu';

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

  async getMenuStock(menuId) {
    const query = {
      text: `
        SELECT 
          i.stock / mi.qty AS stock
          FROM menu_ingredients mi 
            LEFT JOIN ingredients i ON i.id = mi.ingredient_id
            WHERE mi.menu_id = $1 
            GROUP BY i.stock / mi.qty
      `,
      values: [menuId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Stock tidak mencukupi.');
    }

    return result.rows[0];
  }

  async searchMenu(name) {
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
          WHERE LOWER(m.name) LIKE $1
      `,
      values: [`%${name}%`],
    };

    const result = await this._pool.query(query);
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
      throw new NotFoundError('Gagal memperbarui menu, Id tidak ditemukan');
    }

    await this._cacheService.remove('menu');
    await this._cacheService.remove(`menu:${menuId}`);
  }

  async deleteMenuById(menuId, imgPath) {
    const query = {
      text: 'DELETE FROM menu WHERE id = $1 RETURNING cover_url AS url',
      values: [menuId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus menu, Id tidak ditemukan.');
    }

    if (result.rows[0].url !== null) {
      const coverUrl = result.rows[0].url;
      const parts = coverUrl.split('/');
      const filename = parts.slice(-1)[0];

      try {
        fs.unlink(`${imgPath}/${filename}`, (err) => {
          if (err) throw err;
        });
      } catch (err) {
        throw InternalServerError('Terjadi kegagalan sistem.');
      }
    }

    await this._cacheService.remove('menu');
    await this._cacheService.remove(`menu:${menuId}`);
  }
}

module.exports = MenuService;
