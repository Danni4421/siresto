const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class MenuIngredientsService {
  constructor() {
    this._pool = new Pool();
  }

  async addMenuIngredient({ menuId, ingredientId, qty }) {
    const id = `mi-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO menu_ingredients VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, menuId, ingredientId, qty],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menambahkan bahan baku menu.');
    }
  }

  async deleteMenuIngredient(menuId, ingredientId) {
    const query = {
      text: 'DELETE FROM menu_ingredients WHERE menu_id = $1 AND ingredient_id = $2 RETURNING id',
      values: [menuId, ingredientId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus bahan baku menu.');
    }
  }
}

module.exports = MenuIngredientsService;
