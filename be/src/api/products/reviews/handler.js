const autoBind = require('auto-bind');

class ReviewsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postReviewsHandler(request, h) {
    this._validator.validatePostReviewPayload(request.payload);
    const { id: userId } = request.auth.credentials;
    const { menuId } = request.payload;

    await this._service.verifyUserReview(userId, menuId);
    const reviewId = await this._service.addReviews(userId, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan komentar.',
      data: {
        reviewId,
      },
    });
    response.code(201);
    return response;
  }

  async getReviewsHandler() {
    const reviews = await this._service.getReviews();
    return {
      status: 'success',
      message: 'Berhasil mendapatkan komentar.',
      data: {
        reviews,
      },
    };
  }

  async getReviewUserHandler(request) {
    const { id: userId } = request.auth.credentials;
    const userReviews = await this._service.getReviewByUserId(userId);
    return {
      status: 'success',
      message: 'Berhasil mendapatkan review user.',
      data: {
        review: userReviews,
      },
    };
  }

  async getReviewMenuHandler(request) {
    const { id: menuId } = request.params;
    const menuReviews = await this._service.getReviewByMenuId(menuId);
    return {
      status: 'success',
      message: 'Berhasil mendapatkan review menu.',
      data: {
        review: menuReviews,
      },
    };
  }

  async getMenuRatingHandler(request) {
    const { id: menuId } = request.params;
    const { average, rater } = await this._service.getMenuRating(menuId);
    return {
      status: 'success',
      message: 'Berhasil mendapatkan rating menu.',
      data: {
        average,
        rater,
      },
    };
  }

  async putReviewMenuHandler(request) {
    this._validator.validatePutReviewPayload(request.payload);
    const { id: menuId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._service.putReviewMenuById(userId, menuId, request.payload);

    return {
      status: 'success',
      message: 'Berhasil memperbarui review menu.',
    };
  }

  async deleteReviewMenuHandler(request) {
    const { id: menuId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._service.deleteReviewMenuById(userId, menuId);

    return {
      status: 'success',
      message: 'Berhasil menghapus review menu.',
    };
  }
}

module.exports = ReviewsHandler;
