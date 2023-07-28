const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class IngredientsService {
  constructor() {
    this._pool = new Pool();
  }

  async addIngredients({ name, price, stock, msUnit }) {
    const id = `ingredient-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO ingredients VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, price, stock, msUnit],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menambahkan bahan baku.');
    }
  }

  // need to fix
  async getIngredients() {
    const result = await this._pool.query(`
        SELECT id, name, stock FROM ingredients;
    `);

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan bahan baku.');
    }

    return result.rows.map; // fix map to model ingredient
  }

  async getIngredientById(ingredientId) {
    const query = {
      text: 'SELECT * FROM ingredients WHERE id = $1',
      values: [ingredientId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan bahan baku, Id tidak ditemukan.');
    }
  }

  async putIngredientById(ingredientId, { name, price, stock, msUnit }) {
    const query = {
      text: `
            UPDATE ingredients SET
            name = $1, 
            price = $2, 
            stock = $3,
            ms_unit = $4
            WHERE id = $5
        `,
      values: [name, price, stock, msUnit, ingredientId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal memperbarui bahan baku, Id tidak ditemukan.');
    }
  }

  async deleteIngredientById(ingredientId) {
    const query = {
      text: 'DELETE FROM ingredients WHERE id = $1 RETURNING id',
      values: [ingredientId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal menghapus bahan baku, Id tidak ditemukan.');
    }
  }
}

module.exports = IngredientsService;
