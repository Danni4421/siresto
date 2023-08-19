import axios from 'axios';
import { config } from './config';
import { authConfig } from './token';
import { tokenAgeExcededResponse } from './errorHandler';
import { ErrorAlert } from '../alert/ErrorAlert';

export const addTransactions = async ({
  menuId,
  qty,
  status = 'processed',
}) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleDateString('default', { month: 'long' });
  const day = date.getDate();

  const transactinsDate = `${year} ${month} ${day}`;
  alert(transactinsDate);

  const response = await axios
    .post(
      `${config.baseUrl}/transactions`,
      {
        menuId,
        date: transactinsDate,
        qty,
        status,
      },
      authConfig
    )
    .then((res) => {
      return res.data.data;
    });

  return response;
};

export const getTransactionUser = async () => {
  try {
    const response = await axios
      .get(`${config.baseUrl}/transactions`, authConfig)
      .then((res) => {
        return res.data.data.userTransactions;
      });

    return response;
  } catch (error) {
    const statusCode = error.response.status;
    if (statusCode === 401) {
      tokenAgeExcededResponse('Anda perlu login');
    }

    if (statusCode === 404) {
      ErrorAlert('Transaksi tidak ditemukan.');
      window.location = '/menu';
    }
  }
};
