const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../../exceptions/client/InvariantError');
const NotFoundError = require('../../../exceptions/client/NotFoundError');

class IngredientsService {
  constructor() {
    this._pool = new Pool();
  }

  async addIngredients({ name, price, stock, unit }) {
    const id = `ingredient-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO ingredients VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, price, stock, unit],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal menambahkan bahan baku.');
    }

    return result.rows[0].id;
  }

  async getIngredients() {
    const result = await this._pool.query(`
        SELECT id, name, stock FROM ingredients;
    `);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan bahan baku.');
    }

    return result.rows;
  }

  async getIngredientById(ingredientId) {
    const query = {
      text: 'SELECT * FROM ingredients WHERE id = $1',
      values: [ingredientId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        'Gagal mendapatkan bahan baku, Id tidak ditemukan.'
      );
    }

    return result.rows[0];
  }

  async putIngredientById(ingredientId, { name, price, stock, unit }) {
    const query = {
      text: `
            UPDATE ingredients SET
              name = $1, 
              price = $2, 
              stock = $3,
              ms_unit = $4
            WHERE id = $5
        `,
      values: [name, price, stock, unit, ingredientId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        'Gagal memperbarui bahan baku, Id tidak ditemukan.'
      );
    }
  }

  async deleteIngredientById(ingredientId) {
    const query = {
      text: 'DELETE FROM ingredients WHERE id = $1 RETURNING id',
      values: [ingredientId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        'Gagal menghapus bahan baku, Id tidak ditemukan.'
      );
    }
  }

  async updateIngredientStock(ingredientId, updatedStock) {
    const query = {
      text: 'UPDATE ingredients SET stock = $1 WHERE id = $2',
      values: [updatedStock, ingredientId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui stock, Id tidak ditemukan.');
    }
  }

  async verifyIngredientStock(ingredientId, neededStock) {
    const query = {
      text: 'SELECT name, stock FROM ingredients WHERE id = $1',
      values: [ingredientId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan menu, Id tidak ditemukan.');
    }

    const { name, stock } = result.rows[0];

    if (stock < neededStock) {
      throw new InvariantError(`Bahan baku ${name} telah habis.`);
    }

    const updatedStock = stock - neededStock;
    await this.updateIngredientStock(ingredientId, updatedStock);
  }
}

module.exports = IngredientsService;
