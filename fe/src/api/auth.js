import axios from 'axios';
import { config } from './config';
import { ErrorAlert } from '../alert/ErrorAlert';

export const addAuth = async (username, password) => {
  const result = await axios
    .post(`${config.baseUrl}/authentications`, {
      username,
      password,
    })
    .catch(() => {
      ErrorAlert('Username atau Password Terdapat Kesalahan');
    });
  return result.data;
};

export const isAuth = () => {
  const result = localStorage.getItem('ACCESS_TOKEN');
  return result !== null ? true : false;
};

export const deleteAuth = async () => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  localStorage.removeItem('ACCESS_TOKEN');
  localStorage.removeItem('AUTH_STATE');
  const result = await axios.delete(`${config.baseUrl}/authentications`, {
    data: {
      accessToken,
    },
  });

  if (result.status !== 200) {
    alert('Gagal Menghapus Access Token');
  } else {
    window.location = '/login';
  }
};
