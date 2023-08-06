const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../../exceptions/client/InvariantError');
const NotFoundError = require('../../../exceptions/client/NotFoundError');

class MenuIngredientsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addMenuIngredients({ menuId, ingredientId, qty }) {
    const id = `mi-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO menu_ingredients VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, menuId, ingredientId, qty],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal menambahkan bahan baku menu.');
    }

    await this._cacheService.remove(`menu-ingredients:${menuId}`);

    return result.rows[0].id;
  }

  async getMenuIngredients(menuId) {
    const key = `menu-ingredients:${menuId}`;
    try {
      const result = await this._cacheService.get(key);
      const menuIngredients = JSON.parse(result);
      return menuIngredients;
    } catch (error) {
      const query = {
        text: `
        SELECT 
          i.id,
          i.name,
          mi.qty,
          i.ms_unit
          FROM menu_ingredients mi
            LEFT JOIN ingredients i ON i.id = mi.ingredient_id
            WHERE mi.menu_id = $1
      `,
        values: [menuId],
      };

      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Gagal mendapatkan bahan baku menu.');
      }

      const menuIngredients = result.rows;
      const value = JSON.stringify(menuIngredients);
      await this._cacheService.set(key, value);

      return menuIngredients;
    }
  }

  async deleteMenuIngredient(menuId, ingredientId) {
    const query = {
      text: 'DELETE FROM menu_ingredients WHERE menu_id = $1 AND ingredient_id = $2 RETURNING id',
      values: [menuId, ingredientId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus bahan baku menu.');
    }

    await this._cacheService.remove(`menu-ingredients:${menuId}`);
  }
}

module.exports = MenuIngredientsService;
