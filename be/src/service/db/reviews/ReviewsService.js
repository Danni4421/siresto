const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../../exceptions/client/InvariantError');
const NotFoundError = require('../../../exceptions/client/NotFoundError');

class ReviewsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addReviews(userId, { menuId, review, star }) {
    const id = `review-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO reviews VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [id, userId, menuId, review, star],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal menambahkan review.');
    }

    await this._cacheService.remove('reviews');
    await this._cacheService.remove(`review-${userId}`);
    await this._cacheService.remove(`review-${menuId}`);

    return result.rows[0].id;
  }

  async getReviews() {
    const key = 'reviews';
    try {
      const result = await this._cacheService.get(key);
      const reviews = JSON.parse(result);
      return reviews;
    } catch (error) {
      const result = await this._pool.query(`
        SELECT 
          r.id,
          u.first_name AS "firstName",
          u.last_name AS "lastName",
          m.name AS "menuName",
          r.comment,
          r.star
          FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            LEFT JOIN menu m ON r.menu_id = m.id
      `);

      if (!result.rowCount) {
        throw new NotFoundError('Gagal mendapatkan review.');
      }

      const reviews = result.rows;
      const value = JSON.stringify(reviews);
      await this._cacheService.set(key, value);

      return reviews;
    }
  }

  async getReviewByUserId(userId) {
    const key = `review:${userId}`;
    try {
      const result = await this._cacheService.get(key);
      const reviewUser = JSON.parse(result);
      return reviewUser;
    } catch (error) {
      const query = {
        text: `
          SELECT 
            u.name,
            r.review,
            r.star
          FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            WHERE r.user_id = $1, 
        `,
        values: [userId],
      };

      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Gagal mendapatkan review user.');
      }

      const reviewUser = result.rows;
      const value = JSON.stringify(reviewUser);
      await this._cacheService.set(key, value);

      return reviewUser;
    }
  }

  async getReviewByMenuId(menuId) {
    const key = `review:${menuId}`;
    try {
      const result = await this._cacheService.get(key);
      const reviewMenu = JSON.parse(result);
      return reviewMenu;
    } catch (error) {
      const query = {
        text: `SELECT 
        r.id,
        r.comment,
        r.star,
        u.first_name AS "firstName",
        u.last_name AS "lastName"
        FROM reviews r 
        LEFT JOIN users u ON u.id = r.user_id
        WHERE r.menu_id = $1`,
        values: [menuId],
      };

      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Gagal mendapatkan review menu.');
      }

      const reviewMenu = result.rows;
      const value = JSON.stringify(reviewMenu);
      await this._cacheService.set(key, value);

      return reviewMenu;
    }
  }

  async getMenuRating(menuId) {
    const query = {
      text: `
        SELECT 
          SUM(star)/NULLIF(COUNT(*), 0) AS average, 
          COUNT(*) AS rater 
        FROM reviews 
          WHERE menu_id = $1
      `,
      values: [menuId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan rating menu.');
    }

    const { average, rater } = result.rows[0];

    return { average: parseFloat(average), rater };
  }

  async putReviewMenuById(userId, menuId, { review, star }) {
    const query = {
      text: 'UPDATE reviews SET review = $1, star = $2 WHERE user_id = $3 AND menu_id = $4',
      values: [review, star, userId, menuId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui review.');
    }

    await this._cacheService.remove('reviews');
    await this._cacheService.remove(`review-${userId}`);
    await this._cacheService.remove(`review-${menuId}`);
  }

  async deleteReviewMenuById(userId, menuId) {
    const query = {
      text: 'DELETE FROM reviews WHERE user_id = $1 AND menu_id = $2',
      values: [userId, menuId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus review.');
    }

    await this._cacheService.remove('reviews');
    await this._cacheService.remove(`review-${userId}`);
    await this._cacheService.remove(`review-${menuId}`);
  }

  async verifyUserReview(userId, menuId) {
    const query = {
      text: 'SELECT * FROM reviews WHERE user_id = $1 AND menu_id = $2',
      values: [userId, menuId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('User sudah berkomentar.');
    }
  }
}

module.exports = ReviewsService;
