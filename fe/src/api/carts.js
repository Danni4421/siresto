import axios from 'axios';
import { authConfig } from './token';
import { config } from './config';
import {
  badRequest,
  notFoundError,
  tokenAgeExcededResponse,
} from './errorHandler';
import { ErrorAlert } from '../alert/ErrorAlert';

export const addCarts = async (payload) => {
  try {
    const response = await axios
      .post(`${config.baseUrl}/carts`, payload, authConfig)
      .then((res) => {
        const { status } = res;
        return status;
      });
    return response;
  } catch (error) {
    if (error.response.status === 400) {
      badRequest('Stock bahan baku tidak cukup', 1300);
    }

    if (error.response.status === 401) {
      tokenAgeExcededResponse('Anda perlu login');
    }

    if (error.response.status === 404) {
      notFoundError('Bahan baku yang dibutuhkan tidak tersedia', 2000);
    }
  }
};

export const getCarts = async () => {
  try {
    const response = await axios
      .get(`${config.baseUrl}/carts`, authConfig)
      .then((response) => {
        return response.data.data;
      });

    return response;
  } catch (error) {
    const statusCode = error.response.status;
    if (statusCode === 401) {
      tokenAgeExcededResponse('Anda perlu login');
    }

    if (statusCode === 404) {
      ErrorAlert('Anda tidak memiliki barang belanja', 2000);
    }
  }
};

export const getCartById = async (id) => {
  try {
    const response = await axios
      .get(`${config.baseUrl}/carts/${id}`, authConfig)
      .then((response) => {
        return response.data.data.cart;
      });

    return response;
  } catch (error) {
    const statusCode = error.response.status;
    if (statusCode === 401) {
      tokenAgeExcededResponse('Anda perlu login');
    }

    if (statusCode === 404) {
      ErrorAlert('Gagal menghapus keranjang belanja.');
    }
  }
};

export const getCartByMenuId = async (menuId) => {
  try {
    const response = await axios
      .get(`${config.baseUrl}/carts/menu/${menuId}`, authConfig)
      .then((response) => {
        return response.data.data.cart;
      });

    return response;
  } catch (error) {
    const statusCode = error.response.status;
    if (statusCode === 400) {
      ErrorAlert('Gagal menambahkan ke dalam keranjang belanja', 1500);
    }

    if (statusCode === 401) {
      tokenAgeExcededResponse('Anda perlu login');
    }

    return statusCode;
  }
};

export const putCartById = async (id, qty) => {
  try {
    const response = await axios
      .put(`${config.baseUrl}/carts/${id}`, { qty }, authConfig)
      .then((response) => {
        return response.status;
      });

    return response;
  } catch (error) {
    if (error.response.status === 400) {
      ErrorAlert('Bahan baku untuk menu habis.');
    }
  }
};

export const deleteCartById = async (id) => {
  try {
    const response = await axios
      .delete(`${config.baseUrl}/carts/${id}`, authConfig)
      .then((res) => {
        const { status } = res;
        return status;
      });

    return response;
  } catch (error) {
    const statusCode = error.response.status;
    if (statusCode === 401) {
      tokenAgeExcededResponse('Anda perlu login');
    }

    if (statusCode === 404) {
      ErrorAlert('Gagal menghapus keranjang belanja.');
    }
  }
};
