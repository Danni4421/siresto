const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../../exceptions/client/InvariantError');
const NotFoundError = require('../../../exceptions/client/NotFoundError');

class IngredientsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
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

    await this._cacheService.remove('ingredients');

    return result.rows[0].id;
  }

  async getIngredients() {
    const key = 'ingredients';
    try {
      const result = await this._cacheService.get(key);
      const ingredients = JSON.parse(result);
      return ingredients;
    } catch (error) {
      const result = await this._pool.query(`
        SELECT id, name, stock FROM ingredients;
    `);

      if (!result.rowCount) {
        throw new NotFoundError('Gagal mendapatkan bahan baku.');
      }

      const ingredients = result.rows;
      const value = JSON.stringify(ingredients);
      await this._cacheService.set(key, value);

      return ingredients;
    }
  }

  async getIngredientById(ingredientId) {
    const key = `ingredient:${ingredientId}`;
    try {
      const result = await this._cacheService.get(key);
      const ingredient = JSON.parse(result);
      return ingredient;
    } catch (error) {
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

      const ingredient = result.rows[0];
      const value = JSON.stringify(ingredient);
      await this._cacheService.set(key, value);

      return ingredient;
    }
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

    await this._cacheService.remove(`ingredient:${ingredientId}`);
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

    await this._cacheService.remove(`ingredient:${ingredientId}`);
  }

  async updateIngredientStock(ingredientId, qtyTransactions) {
    const query = {
      text: 'UPDATE ingredients SET stock = stock - $1 WHERE id = $2',
      values: [qtyTransactions, ingredientId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui stock, Id tidak ditemukan.');
    }

    await this._cacheService.remove(`ingredient:${ingredientId}`);
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

    console.log({ stock, neededStock });

    if (stock < neededStock) {
      throw new InvariantError(`Bahan baku ${name} telah habis.`);
    }
  }
}

module.exports = IngredientsService;
